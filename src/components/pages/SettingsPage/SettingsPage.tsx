'use client';

import { SettingsContext } from '@/providers';
import { useContext } from 'react';

export default function SettingsPage() {
	const { isTaskMode, setIsTaskMode, isNoiseMode, setIsNoiseMode, isLongBreak, setIsLongBreak } =
		useContext(SettingsContext);

	return (
		// ここが強引なので、後で修正する
		<div className='flex flex-col gap-4 pt-16 items-center'>
			<h2 className='mb-8'>Settings</h2>
			<label className='label cursor-pointer w-80'>
				<span className='label-text'>Task Mode</span>
				<input
					type='checkbox'
					className='toggle'
					checked={isTaskMode}
					onChange={(e) => {
						setIsTaskMode(e.target.checked);
					}}
				/>
			</label>

			<label className='label cursor-pointer w-80'>
				<span className='label-text'>Noise Mode</span>
				<input
					type='checkbox'
					className='toggle'
					checked={isNoiseMode}
					onChange={(e) => {
						setIsNoiseMode(e.target.checked);
					}}
				/>
			</label>

			<label className='label cursor-pointer w-80'>
				<span className='label-text'>Long Break</span>
				<input
					type='checkbox'
					className='toggle'
					checked={isLongBreak}
					onChange={(e) => {
						setIsLongBreak(e.target.checked);
					}}
				/>
			</label>
		</div>
	);
}
