import { ReactNode } from 'react';

interface BackgroundProps {
	children: ReactNode;
	flag: boolean;
}

// https://zenn.dev/nishinoshake/articles/fc5c5d6e5af61c
// ここにCanvasでグラデーションを描画する処理を書く
export default function Background(props: BackgroundProps) {
	return (
		<div
			className={`transition-all duration-500 ${props.flag ? ' bg-red-500' : 'bg-blue-500'}`}
		>
			{props.children}
		</div>
	);
}
