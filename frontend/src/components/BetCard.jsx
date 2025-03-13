import React from 'react';

export default function BetCard({}) {
    return (
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden w-1/2 justify-center">
            <div className=" text-center p-4">
                <h2 className="text-2xl font-bold">Bet Card</h2>
            </div>
            <div className='flex flex-row justify-around'>
                <div className="p-4 text-center">
                    <p className="text-gray-700">Bet Card content #1</p>
                    <p className="text-gray-700">Odd #1</p>
                    <p className="text-gray-700">Stake #1</p>
                    <a href="https://google.com" className='bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Test</a>
                    <a href="https://google.com" className='bg-blue-700 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Test</a>
                    <a href="https://google.com" className='bg-blue-900 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Test</a>
                </div>
                <div className="p-4 text-center">
                    <p className="text-gray-700">Bet Card content #2</p>
                    <p className="text-gray-700">Odd #2</p>
                    <p className="text-gray-700">Stake #2</p>
                    <a href="https://google.com" className='bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Test</a>
                    <a href="https://google.com" className='bg-blue-700 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Test</a>
                    <a href="https://google.com" className='bg-blue-900 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 block mb-2'>Test</a>
                </div>
            </div>
        </div>
    )
}