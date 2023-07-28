import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { TaskForm } from './TaskForm';

describe('TaskForm', () => {
    it('renders without crashing', () => {
        const mockHandleSubmit = jest.fn();
        render(<TaskForm onTaskAdded={mockHandleSubmit} />);
    });

    it('has name input', () => {
        const mockHandleSubmit = jest.fn();
        const { getByLabelText } = render(
            <TaskForm onTaskAdded={mockHandleSubmit} />
        );
        const input = getByLabelText('Task Name');
        expect(input).toBeInTheDocument();
    });

    it('has time spent input', () => {
        const mockHandleSubmit = jest.fn();
        const { getByLabelText } = render(
            <TaskForm onTaskAdded={mockHandleSubmit} />
        );
        const input = getByLabelText('Time Spent (in hours)');
        expect(input).toBeInTheDocument();
    });

    it('has create task button', () => {
        const mockHandleSubmit = jest.fn();
        const { getByText } = render(
            <TaskForm onTaskAdded={mockHandleSubmit} />
        );
        const button = getByText('Create Task');
        expect(button).toBeInTheDocument();
    });
});
