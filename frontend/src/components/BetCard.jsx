import { React, useState } from "react";

export default function BetCard({}) {
  const min = 1;
  const max = 1000;
  const step = 1;
  const oLStake = 50.41;
  const oRStake = 49.59;
  const [value, setValue] = useState(100);
  const [lStake, setLStake] = useState(oLStake);
  const [rStake, setRStake] = useState(oRStake);

  const handleChange = (e) => {
    let newValue = Number(e.target.value);
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;

    const ratio = 100 / newValue;
    const newL = oLStake / ratio;
    const newR = oRStake / ratio;
    setLStake(newL.toFixed(2));
    setRStake(newR.toFixed(2));
    setValue(newValue);
  };

  return (
    <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden w-1/2 justify-center">
      <div className=" text-center p-4">
        <h2 className="text-2xl font-bold">Bet Card</h2>
      </div>
      <div className="flex flex-row justify-around">
        <div className="p-4 text-center grow-1">
          <p className="text-gray-700 font-bold text-xl">Los Angeles Lakers</p>
          <p className="text-gray-700 font-semibold text-l">-200 (1.5)</p>
          <p className="text-gray-700">Fanduel</p>
          <a
            href="https://google.com"
            className="bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2"
          >
            Direct Link
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
            <p className="font-bold text-3xl">{lStake}</p>
          </div>
          <div>
            <p className="font-bold text-3xl">{rStake}</p>
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
          <p className="text-gray-700 font-bold text-xl">Toronto Raptors</p>
          <p className="text-gray-700 font-semibold text-l">-400 (1.25)</p>
          <p className="text-gray-700">Bet 365</p>
          <a
            href="https://google.com"
            className="bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2"
          >
            Direct Link
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
