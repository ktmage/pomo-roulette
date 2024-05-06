import { SettingsContext } from '@/providers/SettingsProvider';
import { useContext } from 'react';

export default function Settings() {
	const {
		isTaskMode,
		setIsTaskMode,
		isNoiseMode,
		setIsNoiseMode,
		isAutoStart,
		setIsAutoStart,
		isLongBreak,
		setIsLongBreak,
	} = useContext(SettingsContext);

	return (
		<>
			<h1>Settings</h1>
			<hr />
			<br />
			{/* <p>Settings will be added soon.</p> */}
			<div className='form-control'>
				<label className='label cursor-pointer'>
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

				<label className='label cursor-pointer'>
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

				<label className='label cursor-pointer'>
					<span className='label-text'>Auto Start</span>
					<input
						type='checkbox'
						className='toggle'
						checked={isAutoStart}
						onChange={(e) => {
							setIsAutoStart(e.target.checked);
						}}
					/>
				</label>

				<label className='label cursor-pointer'>
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
		</>
	);
}
