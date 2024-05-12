'use client';

import { useCallback, useEffect, useState } from 'react';

interface useLocalStorageProps<T> {
	key: string;
	initialValue: T;
}

export default function useLocalStorage<T>(props: useLocalStorageProps<T>) {
	const [value, setValue] = useState<T>(initValue());

	function initValue() {
		if (typeof window !== 'undefined') {
			const value = window.localStorage.getItem(props.key);
			return value ? JSON.parse(value) : props.initialValue;
		}
		return props.initialValue;
	}

	const saveValue = useCallback(
		(value: T) => {
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(props.key, JSON.stringify(value));
			}
		},
		[props.key],
	);

	useEffect(() => {
		saveValue(value);
	}, [value, saveValue]);

	return [value, setValue] as const;
}
