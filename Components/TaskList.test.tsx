import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { TasksList } from './TasksList';
import { Task } from '../types/Task';

describe('TasksList', () => {
    const tasks: Task[] = [
        {
            id: '1',
            name: 'Task 1',
            type: 'Story',
            timeSpent: 2,
            dates: [new Date()],
            labels: ['Urgent'],
        },
        {
            id: '2',
            name: 'Task 2',
            type: 'Bug',
            timeSpent: 4,
            dates: [new Date()],
            labels: ['Important'],
        },
    ];

    const mockTaskUpdated = jest.fn();
    const mockTaskDeleted = jest.fn();

    it('renders task list', () => {
        const { getByText } = render(
            <TasksList
                tasks={tasks}
                errorMsg="Error"
                onTaskUpdated={mockTaskUpdated}
                onTaskDeleted={mockTaskDeleted}
            />
        );

        tasks.forEach((task) => {
            expect(getByText(task.name)).toBeInTheDocument();
            expect(getByText(`Type: ${task.type}`)).toBeInTheDocument();
            expect(
                getByText(`Time spent: ${task.timeSpent} hours`)
            ).toBeInTheDocument();
            task.labels.forEach((label) => {
                expect(getByText(`Labels: ${label}`)).toBeInTheDocument();
            });
        });
    });
});
