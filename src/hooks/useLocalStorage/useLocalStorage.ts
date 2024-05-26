'use client';

import { useCallback, useEffect, useState } from 'react';

interface useLocalStorageProps<T> {
	key: string;
	initialValue: T;
}

export default function useLocalStorage<T>(props: useLocalStorageProps<T>) {
	const [_value, _setValue] = useState<T>(props.initialValue);

	useEffect(() => {
		const value = localStorage.getItem(props.key);
		if (value) {
			_setValue(JSON.parse(value));
		}
	}, [props.key, _setValue]);

	// localstorageを更新しつつstateを更新するsetter関数
	const setValue = useCallback(
		(value: T) => {
			_setValue(value);
			localStorage.setItem(props.key, JSON.stringify(value));
		},
		[props.key, _setValue],
	);

	return [_value, setValue] as const;
}
