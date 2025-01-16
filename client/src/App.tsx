import useSWR from 'swr'
import "@mantine/core/styles.css"
import { Box, MantineProvider, List, ThemeIcon, Text } from '@mantine/core'
import AddTodo from './components/AddTodo'
import { CheckCircleFillIcon } from '@primer/octicons-react'

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
  
  async function markTodoAsDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then(r => r.json)

    mutate(updated)
  }

  return <MantineProvider>
    <Box
      style={() => ({
        padding: '2rem',
        width: '100%',
        maxWidth: '64rem',
        margin: '0 auto'
      })}>
      {data?.map((todo: Todo) => {
        return (
          <List spacing="md" size="md" mb={24} center>
            <List.Item key={`todo__${todo.id}`}
            style={{ display: "flex", alignItems: "center" }} 
            onClick={() => markTodoAsDone(todo.id)}
            icon = {
              todo.done ? (
                <ThemeIcon color='teal' size='lg' radius='xl'>
                  <CheckCircleFillIcon size={32}/>
                </ThemeIcon>) : (
                <ThemeIcon color='gray' size='lg' radius='xl'>
                  <CheckCircleFillIcon size={32} />
                </ThemeIcon>
              )
            }
            ><Text size='xl' fw={500} ml={4}>{todo.title}</Text></List.Item>
          </List>
        )
      })}
      <AddTodo mutate={mutate} />
    </Box>
  </MantineProvider>
}

export default App