import { useState } from "react"
import {useForm} from "@mantine/form"
import {ENDPOINT, Todo} from "../App"
import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core"
import { KeyedMutator} from "swr"


const AddTodo = ({mutate}: {mutate: KeyedMutator<Todo>}) => {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        }
    })

    async function createTodo(values: {title: string, body: string}) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then(r => r.json()
        )
        
        mutate(updated)
        form.reset()
        setOpen(false)
    }

    return (
        <>
            <Modal 
            opened={open}
            onClose={() => setOpen(false)}
            title="Create todo"
            centered>
                <form onSubmit={form.onSubmit(createTodo)}>
                    <TextInput 
                    required
                    mb={12}
                    label="Todo"
                    placeholder="What do you want to do?"
                    {...form.getInputProps("title")}/> 
                    
                    <Textarea 
                    required
                    mb={12}
                    label="Todo"
                    placeholder="tell me more..."
                    {...form.getInputProps("body")}/>

                    <Button type="submit">Create todo</Button>
                </form>
            </Modal>

            <Group>
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    Add Todo
                </Button>
            </Group>
        </>
    )
}

export default AddTodo