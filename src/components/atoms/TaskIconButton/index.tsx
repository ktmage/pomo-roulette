import { TaskIcon } from '@/utils/icons';

interface TaskIconButtonProps {
	onClick: () => void;
}

export default function TaskIconButton(props: TaskIconButtonProps) {
	return (
		<button
			className='btn btn-circle'
			onClick={props.onClick}
		>
			<TaskIcon fontSize={24} />
		</button>
	);
}
