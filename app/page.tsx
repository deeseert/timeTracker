'use client';
import { useEffect, useState } from 'react';
import { TaskForm } from '../Components/TaskForm';
import { TasksList } from '../Components/TaskList';
import { Task } from '../types/Task';
import { ImportButton } from '../Components/ImportButton';
import { ExportButton } from '../Components/ExportButton';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3001/tasks');

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            const tasks = await response.json();
            setTasks(tasks);
        } catch (error) {
            console.error('An error occurred while fetching tasks.', error);
            setErrorMsg('An error occurred while fetching tasks.');
            setTimeout(() => setErrorMsg(''), 5000);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <h1 className="text-2xl font-semibold mb-4">Task Tracker</h1>
            <ImportButton onTasksImported={fetchTasks} />
            <ExportButton tasks={tasks} />
            <TaskForm onTaskAdded={fetchTasks} />
            <TasksList tasks={tasks} errorMsg={errorMsg} />
        </>
    );
}
