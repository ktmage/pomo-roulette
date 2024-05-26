import Link from 'next/link';

const Menu = [
	// {
	// 	title: 'home',
	// 	href: '/',
	// },
	{
		title: 'settings',
		href: '/settings',
	},
	{
		title: 'tasks',
		href: '/tasks',
	},
];

export default function Navbar() {
	return (
		<div className='navbar'>
			<div className='flex-1'>
				{/* <Link
					href='/'
					className='inline-flex h-12 min-h-12 flex-shrink-0 user-select-none cursor-default flex-wrap items-center justify-center px-4 text-center font-semibold text-xl '
				>
					Pomomate
				</Link> */}
				<Link
					href='/'
					className='btn btn-ghost text-xl font-semibold'
				>
					Pomomate
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
								className='btn btn-ghost text-base-content'
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
