import { useEffect, useState } from 'react';

interface useLocalStorageProps<T> {
	key: string;
	initialValue: T;
}

export default function useLocalStorage<T>(props: useLocalStorageProps<T>) {
	const [value, setValue] = useState<T>(initValue());

	function initValue() {
		const value = localStorage.getItem(props.key);
		return value ? JSON.parse(value) : props.initialValue;
	}

	function saveValue(value: T) {
		localStorage.setItem(props.key, JSON.stringify(value));
	}

	useEffect(() => {
		saveValue(value);
	}, [value]);

	return [value, setValue] as const;
}
