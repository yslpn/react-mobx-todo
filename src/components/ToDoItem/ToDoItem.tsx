import { Tag } from "antd";
import React, { FC } from "react";
import ToDo from "../../store/ToDo";

const ToDoList: FC<{ element: string }> = React.memo(({ element }) => {
    const onClose = () => {
        ToDo.removeToDoItem(element);
    };

    return (
        <Tag closable onClose={onClose}>
            {element}
        </Tag>
    );
})

export default ToDoList;