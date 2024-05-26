'use client';

import { TimerContext } from '@/providers';
import { ReactNode, useContext } from 'react';

interface BackgroundProps {
	children: ReactNode;
}

// https://zenn.dev/nishinoshake/articles/fc5c5d6e5af61c
// ここにCanvasでグラデーションを描画する処理を書く
export default function Background(props: BackgroundProps) {
	const { isWorking } = useContext(TimerContext);

	return (
		<div
			className={`flex flex-col min-h-screen min-w-screen  transition-all duration-500 ${isWorking ? ' bg-red-500' : 'bg-blue-500'}`}
		>
			{props.children}
		</div>
	);
}
