import { Input, Button, Form } from "antd";
import { FC, useState } from "react";
import ToDo from '../../store/ToDo'
import ToDoItem from "../ToDoItem/ToDoItem";

const ToDoList: FC = () => {
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
            {error ? <div style={{ color: 'tomato' }}>{error}</div> : null}

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input placeholder="What do you want to do?" onChange={onChange} value={formData} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 20 }}>
                    <Button type="primary" htmlType="submit" >
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {ToDo.toDoList.map((item) => {
                    return (
                        <div key={item}>
                            <ToDoItem element={item} />
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default ToDoList;