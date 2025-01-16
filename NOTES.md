# Notes

```
{data?.map((todo: Todo) => {
    return (
        <List>
            <List.Item key=`todo__${todo.id}`>{todo.title}</List.Item>
        </List>
    )
})}
```

Hasil

![img](./img/{A810D886-67BF-49DD-8412-A6FF53B1C92E}.png)

```
<Box
    style={() => ({
    padding: '2rem',
    width: '100%',
    maxWidth: '40rem',
    margin: '0 auto'
    })}>
    {data?.map((todo: Todo) => {
    return (
        <List spacing='xs' size='sm' mb={12}>
        <List.Item key={`todo__${todo.id}`}>{todo.title}</List.Item>
        </List>
    )
})}
```

Hasil

![img](./img/{A7D19F11-93E6-48C9-A752-5C8C6EBDC3FE}.png)

```
<List spacing='xs' size='sm' mb={12}>
    <List.Item key={`todo__${todo.id}`}
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
```
Hasil

![img](./img/{F71C47C9-6FC5-44EB-B17B-B6DDC8AD646F}.png)