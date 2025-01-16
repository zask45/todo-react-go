import useSWR from 'swr'
import "@mantine/core/styles.css"
import { Box, MantineProvider, List, ThemeIcon, createTheme } from '@mantine/core'
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

const theme = createTheme({
  fontFamily: 'Helvetica',
});

function App() {
  const {data, mutate} = useSWR('api/todos', fetcher)
  
  async function markTodoAsDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then(r => r.json)

    mutate(updated)
  }

  return <MantineProvider theme={theme}>
    <Box
      style={() => ({
        padding: '1rem',
        width: '100%',
        maxWidth: '60rem',
        margin: '0 auto'
      })}>
      {data?.map((todo: Todo) => {
        return (
          <List spacing='xs' size='sm' mb={12}>
            <List.Item key={`todo__${todo.id}`}
            onClick={() => markTodoAsDone(todo.id)}
            icon = {
              todo.done ? (
                <ThemeIcon color='teal' size={24} radius='xl'>
                  <CheckCircleFillIcon size={24}/>
                </ThemeIcon>) : (
                <ThemeIcon color='gray' size={24} radius='xl'>
                  <CheckCircleFillIcon size={24}/>
                </ThemeIcon>
              )
            }
            >{todo.title}</List.Item>
          </List>
        )
      })}
      <AddTodo mutate={mutate} />
    </Box>
  </MantineProvider>
}

export default App