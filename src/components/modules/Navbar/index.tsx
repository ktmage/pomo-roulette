import Link from 'next/link';

interface NavbarProps {
	title: string;
}

const Menu = [
	{
		title: 'settings',
		href: '/settings',
	},
	{
		title: 'tasks',
		href: '/tasks',
	},
];

export default function Navbar(props: NavbarProps) {
	return (
		<div className='navbar text-white'>
			<div className='flex-1'>
				<Link
					href='/'
					className='btn btn-ghost text-xl'
				>
					{props.title}
				</Link>
			</div>
			<div className='flex-none'>
				<ul
					className='
        flex
        gap-2
    '
				>
					{Menu.map((item) => (
						<li key={item.title}>
							<Link
								href={item.href}
								className='btn btn-ghost'
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
