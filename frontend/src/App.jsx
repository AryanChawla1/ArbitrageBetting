import { useState, useEffect } from 'react'
import useWebSocket from "react-use-websocket"
import BetCard from './components/BetCard'

function App() {
  const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:3000", {
    onOpen: () => console.log("connected"),
    onClose: () => console.log("disconnected"),
    onError: (event) => console.error(event),
    shouldReconnect: () => true,
    share: true,
  })

  useEffect(() => {
    if (lastMessage) {
      console.log(lastMessage.data)
    }
  }, [lastMessage])

  return (
    <div className='flex flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold text-center'>Arbitrage Opportunities</h1>
      <p>WebSocket Status: {readyState === 1 ? "Connected" : "Disconnected" }</p>
      <BetCard/>
      <BetCard/>
    </div>
  )
}

export default App
