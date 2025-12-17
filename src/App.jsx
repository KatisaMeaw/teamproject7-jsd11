import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BrowseTheRange from './home/Browse'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowseTheRange />
    </>
  )
}

export default App
