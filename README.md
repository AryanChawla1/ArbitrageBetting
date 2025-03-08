# ArbitrageBetting

Program that detects and notifies users of possible arbitrages within online sportsbooks

## Program Structure and Tech Stack

### Program Structure

The program will be built into different components: Core Logic, Account Configuration, Odd Retrieving, Frontend.

The core logic and odd retrieving components work together to get the data prepared.

#### Core Logic

The core logic handles the algorithm behind detecting and calculating the profit gain. Calculating arbitrage betting opportunities is quite simple and can be done internally with one sportsbook or externally via comparing multiple sportsbooks. Firstly, let's explain the mathematics behind it.

##### General Understanding

###### Odds

Arbitrage betting is possible when the odds aren't correct, such that the probability doesn't add up to 100% or 1, leaving a chance of guaranteed profit.

Odds are correlated with payout, and thus this is possible. There are three types of odds generally used by sportsbooks: fractional (British), decimal (European), and moneyline (American) odds.

| Decimal | Fractional | American | Probability | Payout per $100 |
| :-----: | :--------: | :------: | :---------: | :-------------: |
|  1.50   |    1/2     |   -200   |   66.67%    |       150       |
|  2.00   |    1/1     |   +100   |   50.00%    |       200       |
|  2.50   |    3/2     |   +150   |   40.00%    |       250       |
|  3.00   |    2/1     |   +200   |   33.33%    |       300       |
|  4.00   |    3/1     |   +300   |   25.00%    |       400       |

- 1/(Decimal Odds) is the implied probability. The payout is that stake \* decimal.
- if fractional is seen as A/B (where A is profit per stake and B is stake required to win A), the implied probability is B/(A+B) _ 100%. The payout is just fractional _ stake + stake.
- American positive odds and negative mean different things. positive odds show much profit you make on a $100 stake, whereas negative odds show much you need to bet to win $100. Thus, the implied probability differs for both calculations. For positive odds, its 100/(odds + 100) _ 100%, and for negative its |odds|/(|odds| + 100) _ 100%. The payout for positive odds is odds/100 \* stake + stake, and for negative its stake/|odds| X 100 + stake.

For simplicity, it's easiest to convert everything to probability and work with that. Going from probability to payout is quite simple, just 1/probability \* stake.

###### Betting Options

For standard betting, you typically have two different bets, binary or ternary. Binary is just win or lose, over or under, whereas ternary will consider the draw or equal. In the end, the betting options should cover all possibilities and if so, thus, must be of 100% probability.

###### Arbitrage Opportunities

However, arbitrage betting can happen when an error occurs with the probability. You see, when the probabilities (via the odds) don't add up to 100%, then there is opportunity to make money. Below is an example.

Let's assume a website has the followings odds.

|      Event      | Odds |
| :-------------: | :--: |
| team 1 wins (A) | 4.5  |
| team 2 wins (B) |  4   |
|    draw (C)     |  2   |

Let's calculate the probability.

1/4.5 + 1/4 + 1/2 = 97.22%.

This is an opportunity for arbitrage betting. Assuming a stake of $100, we can calculate what to bet on each event, and the expected profit.

Recall Odds(A) = 4.5, Prob(A) = 1/4.5 and Prob = 0.9722.
Stake(A) = 100 _ Prob(A) / Prob = 22.86.
Payout(A) = Stake(A) _ Odds(A) = 102.86.
Thus, the profit is 2.86 from the $100 stake.

Recall Odds(B) = 4, Prob(B) = 1/4 and Prob = 0.9722.
Stake(B) = 100 _ Prob(B) / Prob = 25.71.
Payout(B) = Stake(B) _ Odds(B) = 102.86.
Thus, the profit is 2.86 from the $100 stake.

Recall Odds(C) = 2, Prob(C) = 1/2 and Prob = 0.9722.
Stake(C) = 100 _ Prob(C) / Prob = 51.43.
Payout(C) = Stake(C) _ Odds(C) = 102.86.
Thus, the profit is 2.86 from the $100 stake.

So regardless of which of the events occur, by splitting the 100 dollars into 22.86, 25.71 and 51.43, you will make $2.86.

When the odds are above 100%, it means a vig is built in. Basically, this means the sportsbook will make a profit regardless.

This same logic can now be extrapolated to external sportsbooks. Because, if two different sportsbooks have the same events but with different odds, we can mix and match their odds and the stakes we pay in order to make a profit.

Sportsbook 1:
| Event | Odds |
|:---------------:|:----:|
| team 1 wins (A) | 2 |
| team 2 wins (B) | 2 |

Sportsbook 2:
| Event | Odds |
|:---------------:|:----:|
| team 1 wins (A) | 1.9 |
| team 2 wins (B) | 2.1 |

The probability for sportsbook 1 is 100% and sportsbook 2 has a vig and is actually above 100%. But, by considering an arbitrage by mixing the websites, you make money. Let's use A from 1 and B from 2.

1/2 + 1/2.1 = 97.61%.

Recall Odds(A) = 2, Prob(A) = 1/2 and Prob = 0.9761.
Stake(A) = 100 _ Prob(A) / Prob = 51.22.
Payout(A) = Stake(A) _ Odds(A) = 102.44.
Thus, the profit is 2.44 from the $100 stake.

Recall Odds(B) = 2.1, Prob(A) = 1/2.1 and Prob = 0.9761.
Stake(A) = 100 _ Prob(A) / Prob = 48.78.
Payout(A) = Stake(A) _ Odds(A) = 102.44.
Thus, the profit is 2.44 from the $100 stake.

So regardless of the event, the profit is $2.44.

##### Algorithm

Thus, the algorithm pretty much replicates the mathematics explained above. To determine the odds chosen for the sportsbooks, you just take the highest odds in decimal format, or to make it simpler, convert everything to probabilities, and take the lowest of them all.

With the probabilities, sum them up. If they are less than 100%, we can arbitrage. Calculate the stake for each odd, and the expected profit.

This algorithm is the core logic and is quite simple, yet effective in calculating profit.

#### Account Configuration

Accounts are created and saved to configure their email for possible notifications, and sportsbook, sports, teams, players and more to filter possible arbitrage opportunities. The user configuration is still up for debate.

Firebase Authentication will be used to verify users, whereas the database is to store their information.

#### Odds Retrieval

The odds will be retrieved via odds api. Now, due to the plan, there are many options on arbitrage detection.

This will create the request and formulate the data based on account configuration and core logic afterwards to notify users.

##### Option 1: Detect Arbitrage Manually

A user can make a request for all upcoming games to detect arbitrages. Then, any that are found and satisfy other users, will be notified.

##### Option 2: Detect Arbitrage Specifically and Manually

This is pretty much the same as the first option, but the attempt is calculated based on the specific event. This will also be to save usage.

##### Option 3: Detect Arbitrage Automatically

Run a cron job a certain frequency to calculate arbitrages and notify satisfying users. This will have the highest usage.

#### Frontend

The frontend is what the user will interact with. In this case, it will be built on React for a website. Alternatively, Vue to make it lightweight, or React Native for app development.

### Tech Stack

Database: Firebase
Hosting: Firebase?
Backend: Express.js
Frontend: React/Vue?

## Guide to Program

### Installation

After cloning:

```
cd ./backend
npm install
cd ../frontend
npm install
```

### Running Program

After installing:

Backend

```
cd ./backend
npm start
```

Frontend

```
cd ./frontend
npm run dev
```

### Testing Program

After installing:

```
cd ./backend
npm test
```

### Using Program
