import { useState } from "react"
import {useForm} from "@mantine/form"

const Add = () => {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            body: "",
        }
    })
}

export default Add