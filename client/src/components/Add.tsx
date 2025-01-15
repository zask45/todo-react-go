import { useState } from "react"
import {useForm} from "@mantine/form"
import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core"

const Add = () => {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        }
    })

    return (
        <>
            <Modal 
            opened={open}
            onClose={() => setOpen(false)}
            title="Create todo"
            centered>
                <form>
                    <TextInput 
                    required
                    mb={12}
                    label="Todo"
                    placeholder="What do you want to do?"/> 
                    
                    <Textarea 
                    required
                    mb={12}
                    label="Todo"
                    placeholder="tell me more..."/>

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

export default Add