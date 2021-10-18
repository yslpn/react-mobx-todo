import { Input, Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import ToDo from '../../store/ToDo'
import ToDoItem from "../ToDoItem/ToDoItem";
import { IToDoItem } from "../../types";

const ToDoList: FC = observer(() => {
    const [formData, setFormData] = useState<IToDoItem>({ title: '', completed: false });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({ title: e.target.value, completed: false });
        localStorage.setItem('toDoListInput', JSON.stringify({ title: e.target.value, completed: false }));
        ToDo.setError('');
    };

    const onFinish = (): void => {
        ToDo.addToDoItem(formData);
        if (ToDo.Error === '') {
            setFormData({ title: '', completed: false });
            localStorage.setItem('toDoListInput', '');
        }
    };

    const onFinishFailed = (errorInfo: unknown): void => {
        console.log('Failed:', errorInfo);
    };

    const onReset = (): void => {
        ToDo.reset();
    };

    const onFetch = (): void => {
        ToDo.fetchRandomToDoItem();
    };

    useEffect((): void => {
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
                onFinishFailed={onFinishFailed}
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