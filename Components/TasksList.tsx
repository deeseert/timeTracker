"use client"
import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import TaskEditor from './TaskEditor';
import TaskDeletor from './TaskDeletor';

type Props = {
    tasks: Task[];
    errorMsg: string;
    onTaskUpdated: (task: Task) => void;
    onTaskDeleted: (task: Task) => void;
  }

export const TasksList: React.FC<Props> = ({ tasks, errorMsg, onTaskUpdated, onTaskDeleted }) => {

    return (
        <div className="mt-8">
            {errorMsg && (
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {errorMsg}</span>
                </div>
            )}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="p-4 border mb-2 bg-white shadow-lg rounded-md">
                        <h2 className="font-bold text-xl mb-2">{task.name}</h2>
                        <p className="text-gray-700">Type: {task.type}</p>
                        <p className="text-gray-700">Time spent: {task.timeSpent} hours</p>
                        <p className="text-gray-700">Dates: {task.dates.join(', ')}</p>
                        <p className="text-gray-700">Labels: {task.labels.join(', ')}</p>
                        <TaskEditor task={task} onTaskUpdated={onTaskUpdated} />
                        <TaskDeletor task={task} onTaskDeleted={onTaskDeleted} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
