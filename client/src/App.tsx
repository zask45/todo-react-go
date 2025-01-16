import useSWR from 'swr'
import "@mantine/core/styles.css"
import { Box, MantineProvider } from '@mantine/core'
import Add from './components/Add'

export const ENDPOINT = 'http://localhost:4000'

const fetcher = (url: string) => 
  fetch(`${ENDPOINT}/${url}`).then(r => r.json())

function App() {
  const {data, mutate} = useSWR('api/todos', fetcher)

  return <MantineProvider>
    <Box>
      {JSON.stringify(data)}
      <Add />
    </Box>
  </MantineProvider>
}

export default App