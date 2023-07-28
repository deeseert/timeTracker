type TaskType = 'Story' | 'Bug';

interface Task {
  id: string;
  name: string;
  type: TaskType;
  timeSpent: number;
  dates: Date[];
  labels: string[];
}

export type { Task, TaskType };
