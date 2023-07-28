import React from 'react';
import { Task } from '../types/Task';

type TaskDeletorProps = {
    task: Task;
    onTaskDeleted: (task: Task) => void;
};

const TaskDeletor: React.FC<TaskDeletorProps> = ({ task, onTaskDeleted }) => {
    const handleDeleteClick = () => {
        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'DELETE',
        }).then(() => onTaskDeleted(task));
    };

    return (
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleDeleteClick}
        >
            Delete
        </button>
    );
};

export default TaskDeletor;
