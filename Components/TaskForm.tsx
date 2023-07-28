'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskType } from '../types/Task';

type FormData = {
    name: string;
    type: TaskType;
    timeSpent: number;
    dates: string;
    labels: string;
};

function TaskForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const onSubmit = async (data: FormData) => {

        const dates = data.dates
            .split(',')
            .map((date) => new Date(date.trim()));
        const labels = data.labels.split(',').map((label) => label.trim());

        const task: Task = {
            id: uuidv4(),
            name: data.name,
            type: data.type,
            timeSpent: data.timeSpent,
            dates,
            labels,
        };

        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            setSuccessMsg('Task created successfully!');
            setTimeout(() => setSuccessMsg(''), 5000);
            
            reset();
        } catch (error) {
            console.error(error);
            setErrorMsg('An error occurred while creating the task.');
            setTimeout(() => setSuccessMsg(''), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label className="text-lg font-semibold mb-2">Task Name</label>
            <input
                {...register('name', { required: 'This field is required' })}
                className="mb-4 p-2 border border-gray-400 rounded-lg"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <label className="text-lg font-semibold mb-2">Task Type</label>
            <select
                {...register('type')}
                className="mb-4 p-2 border border-gray-400 rounded-lg"
            >
                <option value="Story">Story</option>
                <option value="Bug">Bug</option>
            </select>

            <label className="text-lg font-semibold mb-2">
                Time Spent (in hours)
            </label>
            <input
                {...register('timeSpent', { required: 'This field is required' })}
                className="mb-4 p-2 border border-gray-400 rounded-lg"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <label className="text-lg font-semibold mb-2">
                Dates (comma separated)
            </label>
            <input
                {...register('dates', { required: 'This field is required' })}
                className="mb-4 p-2 border border-gray-400 rounded-lg"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <label className="text-lg font-semibold mb-2">
                Labels (comma separated, maximum 3)
            </label>
            <input
                {...register('labels', { required: 'This field is required' })}
                className="mb-4 p-2 border border-gray-400 rounded-lg"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {successMsg && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> {successMsg}</span>
                </div>
            )}

            {errorMsg && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {errorMsg}</span>
                </div>
            )}

            <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
                Create Task
            </button>
        </form>
    );
}

export default TaskForm;
