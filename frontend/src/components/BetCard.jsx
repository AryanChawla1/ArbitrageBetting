import { React, useState } from "react";

//TODO: Secondary Link logic.

export default function BetCard({ bet }) {
  const { home_team, away_team, best_odds } = bet;

  const homeOdds = best_odds[home_team];
  const awayOdds = best_odds[away_team];
  const homeAmerican = best_odds[`American_${home_team}`];
  const awayAmerican = best_odds[`American_${away_team}`];
  const homeStake = best_odds[`stake_${home_team}`];
  const awayStake = best_odds[`stake_${away_team}`];
  const homeSource = best_odds[`source_${home_team}`];
  const awaySource = best_odds[`source_${away_team}`];
  const homeDirectLink = best_odds[`directLink_${home_team}`];
  const awayDirectLink = best_odds[`directLink_${away_team}`];
  const homeMarketLink = best_odds[`marketLink_${home_team}`];
  const awayMarketLink = best_odds[`marketLink_${away_team}`];
  const homeEventLink = best_odds[`eventLink_${home_team}`];
  const awayEventLink = best_odds[`eventLink_${away_team}`];

  const min = 1;
  const max = 1000;
  const step = 1;
  const [value, setValue] = useState(100);
  const [lStake, setLStake] = useState(homeStake);
  const [rStake, setRStake] = useState(awayStake);

  const handleChange = (e) => {
    let newValue = Number(e.target.value);
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;

    const ratio = 100 / newValue;
    const newL = homeStake / ratio;
    const newR = awayStake / ratio;
    setLStake(newL.toFixed(2));
    setRStake(newR.toFixed(2));
    setValue(newValue);
  };

  return (
    <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden w-full md:w-3/4 lg:w-1/2 mx-auto justify-center">
      <div className=" text-center p-4">
        <h2 className="text-2xl font-bold">Bet Card</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="p-4 text-center grow-1">
          <p className="text-gray-700 font-bold text-xl">{home_team}</p>
          <p className="text-gray-700 font-semibold text-l">
            {homeAmerican} ({homeOdds})
          </p>
          <p className="text-gray-700">{homeSource}</p>
          <a
            href={homeDirectLink !== "unavailable" ? homeDirectLink : "#"}
            target="_blank"
            className={` ${
              homeDirectLink === "unavailable"
                ? "bg-gray-400 cursor-not-allowed hover:bg-red-800"
                : "bg-blue-500"
            } text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2`}
          >
            {homeDirectLink !== "unavailable" ? "Direct Link" : "Unavailable"}
          </a>
          <a
            href="https://google.com"
            className="bg-blue-700 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2"
          >
            Secondary Link
          </a>
        </div>
        <div className="flex items-center justify-evenly grow-2 grid grid-cols-2 place-items-center">
          <div>
            <p className="font-bold text-xs lg:text-l xl:text-3xl">{lStake}</p>
          </div>
          <div>
            <p className="font-bold text-xs lg:text-l xl:text-3xl">{rStake}</p>
          </div>
          <div className="flex flex-col items-center gap-4 col-span-2">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleChange}
              className="w-full accent-blue-500"
            />
            <input
              type="number"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={handleChange}
              className="w-20 p-2 text-center border border-gray-300 rounded-md shadow-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>
        </div>
        <div className="p-4 text-center grow-1">
          <p className="text-gray-700 font-bold text-xl">{away_team}</p>
          <p className="text-gray-700 font-semibold text-l">
            {awayAmerican} ({awayOdds})
          </p>
          <p className="text-gray-700">{awaySource}</p>
          <a
            href={awayDirectLink !== "unavailable" ? awayDirectLink : "#"}
            target="_blank"
            className={` ${
              awayDirectLink === "unavailable"
                ? "bg-gray-400 cursor-not-allowed hover:bg-red-800"
                : "bg-blue-500"
            } text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2`}
          >
            {awayDirectLink !== "unavailable" ? "Direct Link" : "Unavailable"}
          </a>
          <a
            href="https://google.com"
            className="bg-blue-700 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2"
          >
            Secondary Link
          </a>
        </div>
      </div>
    </div>
  );
}
