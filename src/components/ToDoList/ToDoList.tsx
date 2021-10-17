import { Input, Button, Form } from "antd";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import ToDo from '../../store/ToDo'
import ToDoItem from "../ToDoItem/ToDoItem";
import { TToDoItem } from "../../types";

const ToDoList: FC = observer(() => {
    const [formData, setFormData] = useState<TToDoItem>({ name: '', checked: false });
    const [error, setError] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: e.target.value });
        setError('');
    };

    const onFinish = (e: React.SyntheticEvent) => {
        if (formData.name === '') {
            setError('Cannot be empty.');
        } else if (ToDo.toDoList.find(item => item.name === formData.name)) {
            setError('A similar task already exists.');
        } else {
            ToDo.addToDoItem(formData);
            setFormData({ name: '', checked: false });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = () => {
        ToDo.reset();
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
                    <Input placeholder="What do you want to do?" onChange={onChange} value={formData.name} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                        Add
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>

            <div>
                {ToDo.toDoList.map((item) => {
                    return (
                        <ToDoItem key={item.name} element={item} />
                    )
                })}
            </div>
        </>
    );
});

export default ToDoList;