import { Checkbox, Tag } from "antd";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import ToDo from "../../store/ToDo";
import { TToDoItem } from "../../types";

const ToDoList: FC<{ element: TToDoItem }> = observer(({ element }) => {
    const onClose = () => {
        ToDo.removeToDoItem(element);
    };

    const onChange = () => {
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