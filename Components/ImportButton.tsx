import React from 'react';
import { Task } from '../types/Task';

type Props = {
    onTasksImported: () => void;
}

export const ImportButton: React.FC<Props> = ({ onTasksImported }) => {
    const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (e) => {
            if (e.target && typeof e.target.result === 'string') {
                const tasks: Task[] = JSON.parse(e.target.result);
                
                for (const task of tasks) {
                    await fetch('http://localhost:3001/tasks', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(task),
                    });
                }

                onTasksImported();
            }
        };

        reader.readAsText(file);
    };

    return <input type="file" accept=".json" onChange={importTasks} />;
};
