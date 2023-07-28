import React from 'react';
import { Task } from '../types/Task';

type Props = {
    tasks: Task[];
}

export const ExportButton: React.FC<Props> = ({ tasks }) => {
    const exportTasks = () => {
        const tasksJson = JSON.stringify(tasks, null, 2);
        const blob = new Blob([tasksJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tasks.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={exportTasks}
        >
            Export Tasks
        </button>
    );
};
