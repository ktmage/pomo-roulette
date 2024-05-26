'use client';

import { createContext, ReactNode, useCallback, useState } from 'react';
import Task from '@/types/task';
import { useLocalStorage } from '@/hooks';

interface TasksContextProps {
	tasks: Task[];
	newTask: string;
	setNewTask: (task: string) => void;
	currentTask: Task | null;
	drawTask: () => void;
	addTask: () => void;
	deleteTask: (id: number) => void;
	updatePriority: (id: number, priority: number) => void;
}

export const TasksContext = createContext<TasksContextProps>({} as TasksContextProps);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useLocalStorage<Task[]>({
		key: 'tasks',
		initialValue: [],
	});
	const [newTask, setNewTask] = useState<string>('');
	const [currentTask, setCurrentTask] = useState<Task | null>(null);

	// タスクを抽選して、currentTaskにセットする関数
	const drawTask = useCallback(() => {
		const totalPriority = tasks.reduce((acc, task) => acc + task.priority, 0);
		const random = Math.random() * totalPriority;
		let sum = 0;
		for (let i = 0; i < tasks.length; i++) {
			sum += tasks[i].priority;
			if (random < sum) {
				setCurrentTask(tasks[i]);
				return;
			}
		}
		setCurrentTask(tasks[0]);
	}, [tasks, setCurrentTask]);

	const addTask = useCallback(() => {
		const newTaskObj: Task = {
			id: tasks.length,
			name: newTask,
			priority: 1,
		};
		setTasks([...tasks, newTaskObj]);
		setNewTask('');
	}, [tasks, newTask, setTasks, setNewTask]);

	const deleteTask = useCallback(
		(id: number) => {
			setTasks(tasks.filter((task) => task.id !== id));
		},
		[tasks, setTasks],
	);

	const updatePriority = useCallback(
		(id: number, priority: number) => {
			const newTasks = tasks.map((task) => {
				if (task.id === id) {
					return { ...task, priority };
				}
				return task;
			});
			setTasks(newTasks);
		},
		[tasks, setTasks],
	);

	return (
		<TasksContext.Provider
			value={{
				tasks,
				newTask,
				setNewTask,
				currentTask,
				drawTask,
				addTask,
				deleteTask,
				updatePriority,
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};
