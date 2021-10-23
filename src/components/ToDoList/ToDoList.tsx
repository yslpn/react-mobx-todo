import { Input, Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ToDo from '../../store/ToDo'
import ToDoItem from "../ToDoItem/ToDoItem";
import { IToDoItem } from "../../types";

const ToDoList = observer((): JSX.Element => {
    const [formData, setFormData] = useState<IToDoItem>({} as IToDoItem);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ title: e.target.value, completed: false });
        localStorage.setItem('toDoListInput', JSON.stringify({ title: e.target.value, completed: false }));
        ToDo.setError('');
    };

    const onFinish = (): void => {
        ToDo.addToDoItem(formData);
        setFormData({ title: '', completed: false });
        localStorage.setItem('toDoListInput', '');
    };

    const onReset = (): void => {
        ToDo.reset();
    };

    const onFetch = (): void => {
        ToDo.fetchRandomToDoItem();
    };

    useEffect(() => {
        const inputSavedText = JSON.parse(localStorage.getItem('toDoListInput') || '[]');
        setFormData(inputSavedText);
    }, [])

    return (
        <>
            <p>Total in list: {ToDo.toDoList.length}</p>

            {ToDo.Error ? <div style={{ color: 'tomato', marginBottom: '24px', fontSize: '2vmin' }}>{ToDo.Error}</div> : null}

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="What do you want to do?" onChange={onChange} value={formData.title} autoFocus />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                        Add
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{ marginRight: '8px' }}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFetch}>
                        Fetch
                    </Button>
                </Form.Item>
            </Form>

            <div>
                {ToDo.toDoList.map((item) => {
                    return (
                        <ToDoItem key={item.title} element={item} />
                    )
                })}
            </div>
        </>
    );
});

export default ToDoList;