import useSWR from 'swr'
import "@mantine/core/styles.css"
import { Box, MantineProvider } from '@mantine/core'
import Add from './components/Add'

export const ENDPOINT = 'http://localhost:4000'

export interface Todo {
  id: number,
  title: String,
  body: String,
  done: boolean
}

const fetcher = (url: string) => 
  fetch(`${ENDPOINT}/${url}`).then(r => r.json())

function App() {
  const {data, mutate} = useSWR('api/todos', fetcher)

  return <MantineProvider>
    <Box>
      {JSON.stringify(data)}
      <Add mutate={mutate}/>
    </Box>
  </MantineProvider>
}

export default App