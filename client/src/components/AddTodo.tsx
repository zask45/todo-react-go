import { useState } from "react"
import {useForm} from "@mantine/form"
import {ENDPOINT, Todo} from "../App"
import { Button, Text, Modal, Textarea, TextInput } from "@mantine/core"
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
            size='lg'
            onClose={() => setOpen(false)}
            title="Create todo"
            centered>
                <form onSubmit={form.onSubmit(createTodo)}>
                    <TextInput 
                    required
                    mb={12}
                    size="lg"
                    label="Todo"
                    placeholder="What do you want to do?"
                    {...form.getInputProps("title")}/> 
                    
                    <Textarea 
                    required
                    mb={12}
                    size='lg'
                    label="Todo"
                    placeholder="tell me more..."
                    {...form.getInputProps("body")}/>

                    <Button type="submit" size="lg" mt={12}>Create todo</Button>
                </form>
            </Modal>

            <div>
                <Button fullWidth mb={12} size="lg" onClick={() => setOpen(true)}>
                    <Text fw={700} size='xl'>ADD TODO</Text>
                </Button>
            </div>
        </>
    )
}

export default AddTodo