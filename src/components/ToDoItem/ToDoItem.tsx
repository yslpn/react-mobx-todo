import { Checkbox, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import ToDo from "../../store/ToDo";
import { IToDoItem } from "../../types";
interface IToDoList {
    element: IToDoItem;
};

const ToDoList: FC<IToDoList> = observer(({ element }) => {
    const onClose = (): void => {
        ToDo.removeToDoItem(element);
    };

    const onChange = (): void => {
        ToDo.togleDone(element);
    }

    return (
        <Tag closable onClose={onClose}>
            <Checkbox style={{ marginRight: '10px' }} checked={element.completed} onChange={onChange} />

            <span style={{ marginRight: '10px' }}>
                {element.title}
            </span>
        </Tag>
    );
})

export default ToDoList;