import { QuestionIcon } from '@/utils/icons';

interface IconButtonProps {
	onClick: () => void;
	children?: React.ReactNode;
}

export default function IconButton(props: IconButtonProps) {
	return (
		<button
			className='btn btn-circle'
			onClick={props.onClick}
		>
			<QuestionIcon fontSize={24} />
		</button>
	);
}
