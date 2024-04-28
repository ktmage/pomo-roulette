import { QuestionIcon } from '@/components/icons';

interface QuestionIconButtonProps {
	onClick: () => void;
}

export default function QuestionIconButton(props: QuestionIconButtonProps) {
	return (
		<button
			className='btn btn-circle'
			onClick={props.onClick}
		>
			<QuestionIcon fontSize={24} />
		</button>
	);
}
