import { Input, Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import ToDo from '../../store/ToDo'
import ToDoItem from "../ToDoItem/ToDoItem";

const ToDoList: FC = observer(() => {
    const [formData, setFormData] = useState<string>('');
    const [error, setError] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value);
        setError('');
    };

    const onFinish = (e: React.SyntheticEvent) => {
        if (formData === '') {
            setError('Cannot be empty.');
        } else if (ToDo.toDoList.find(item => item === formData)) {
            setError('A similar task already exists.');
        } else {
            ToDo.addToDoItem(formData);
            setFormData('');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <p>Total in list: {ToDo.toDoList.length}</p>

            {error ? <div style={{ color: 'tomato', marginBottom: '24px', fontSize: '2vmin' }}>{error}</div> : null}

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="What do you want to do?" onChange={onChange} value={formData} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" >
                        Add
                    </Button>
                </Form.Item>
            </Form>

            <div>
                {ToDo.toDoList.map((item) => {
                    return (
                        <ToDoItem key={item} element={item} />
                    )
                })}
            </div>
        </>
    );
});

export default ToDoList;