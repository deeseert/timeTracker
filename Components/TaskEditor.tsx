import React, { useState } from 'react';
import { Task } from '../types/Task';

type TaskEditorProps = {
    task: Task;
    onTaskUpdated: (task: Task) => void;
};

const TaskEditor: React.FC<TaskEditorProps> = ({ task, onTaskUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => response.json())
            .then(onTaskUpdated);
        setIsEditing(false);
    };

    return isEditing ? (
        <form onSubmit={handleFormSubmit}>

            <input
                type="text"
                name="name"
                value={updatedTask.name}
                onChange={handleInputChange}
            />

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                type="submit"
            >
                Update
            </button>
        </form>
    ) : (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setIsEditing(true)}
        >
            Edit
        </button>
    );
};

export default TaskEditor;
