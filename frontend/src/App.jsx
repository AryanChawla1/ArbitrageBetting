import { useState, useEffect } from 'react'
import './App.css'
import useWebSocket from "react-use-websocket"

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
    <>
      <h1>test</h1>
      <p>WebSocket Status: {readyState === 1 ? "Connected" : "Disconnected" }</p>
    </>
  )
}

export default App
