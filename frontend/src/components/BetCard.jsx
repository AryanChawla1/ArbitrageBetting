import React from 'react';

export default function BetCard({}) {
    return (
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden w-1/2 justify-center">
            <div className=" text-center p-4">
                <h2 className="text-2xl font-bold">Bet Card</h2>
            </div>
            <div className='flex flex-row justify-around'>
                <div className="p-4 text-center">
                    <p className="text-gray-700 font-bold text-xl">Los Angeles Lakers</p>
                    <p className="text-gray-700 font-semibold text-l">-200 (1.5)</p>
                    <p className="text-gray-700">Fanduel</p>
                    <a href="https://google.com" className='bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Direct Link</a>
                    <a href="https://google.com" className='bg-blue-700 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Secondary Link</a>
                </div>
                <div className='flex items-center'>
                    <p className='font-bold text-3xl'>50.41</p>
                </div>
                <div className='flex items-center'>
                    <p className='font-bold text-3xl'>49.59</p>
                </div>
                <div className="p-4 text-center">
                    <p className="text-gray-700 font-bold text-xl">Toronto Raptors</p>
                    <p className="text-gray-700 font-semibold text-l">-400 (1.25)</p>
                    <p className="text-gray-700">Bet 365</p>
                    <a href="https://google.com" className='bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Direct Link</a>
                    <a href="https://google.com" className='bg-blue-700 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Secondary Link</a>
                </div>
            </div>
        </div>
    )
}