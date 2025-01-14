import './App.css'

const ENDPOINT = 'https://localhost:4000'

const fetcher = (url: string) => 
  fetch(`${ENDPOINT}/${url}`).then(r => r.json())

function App() {
  <></>
}

export default App