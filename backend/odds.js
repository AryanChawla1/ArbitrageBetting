const axios = require("axios");
const dotenv = require("dotenv");
const { response } = require("express");

// var odds = require("./sample.json");
dotenv.config();
const apiKey = process.env.API_KEY;
const sportsUrl = "https://api.the-odds-api.com/v4/sports";
const interestedSports = ["NHL", "NBA", "MLB"];
const regions = "us,us2";
const markets = "h2h";

async function getSports() {
  try {
    const response = await axios.get(sportsUrl, {
      params: {
        apiKey,
      },
    });

    const sports = response.data;
    const keys = [];

    sports.forEach((sport) => {
      if (interestedSports.includes(sport.title)) {
        keys.push(sport.key);
      }
    });

    return keys;
  } catch (error) {
    console.error("Error status:", error.response?.status || "Unknown");
    console.error(error.response?.data || error.message);
    return [];
  }
}

async function getOdds(sports) {
  try {
    const oddsArray = await Promise.all(
      sports.map(async (sport) => {
        try {
          const response = await axios.get(`${sportsUrl}/${sport}/odds`, {
            params: {
              apiKey,
              regions,
              markets,
            },
          });
          return response.data;
        } catch (error) {
          console.error(
            `Error fetching odds for ${sport}:`,
            error.response?.status || "Unknown"
          );
          console.error(error.response?.data || error.message);
          return null;
        }
      })
    );

    return oddsArray.filter(Boolean).flat();
  } catch (error) {
    console.error("Unexpected error:", error);
    return [];
  }
}

function getBestOdds(odds) {
  return odds
    .map((match) => {
      const bestOdds = {};
      if (!match || !match.bookmakers || !Array.isArray(match.bookmakers)) {
        return null;
      }
      match.bookmakers.forEach((bookmaker) => {
        const h2hMarket = bookmaker.markets.find(
          (market) => market.key === "h2h"
        );

        if (h2hMarket) {
          h2hMarket.outcomes.forEach((outcome) => {
            const name = outcome.name;
            const price = outcome.price;
            const source = bookmaker.key;
            const link = outcome.link;

            if (!bestOdds[name] || price > bestOdds[name]) {
              bestOdds[name] = price;
              bestOdds[`source_${name}`] = source;
              bestOdds[`link_${name}`] = link;
            }
          });
        }
      });

      return {
        id: match.id,
        home_team: match.home_team,
        away_team: match.away_team,
        best_odds: bestOdds,
      };
    })
    .filter(Boolean);
}

module.exports = { getSports, getOdds, getBestOdds };
