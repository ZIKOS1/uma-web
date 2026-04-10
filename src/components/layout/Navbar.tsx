import React from 'react';
import { Button } from '../ui/Button';
import { Compass, Menu, X } from 'lucide-react';

import { Link } from 'react-router-dom';

export function Navbar() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<nav className='fixed top-0 w-full z-50 bg-base-100 backdrop-blur-md border-b border-neutral'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16 items-center'>
					<div className='flex items-center gap-2'>
						<div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'>
							<Compass className='w-5 h-5 text-base-content' />
						</div>
						<span className='font-bold text-xl text-base-content tracking-tight'>
							UMA B2B
						</span>
					</div>

					<div className='hidden md:flex items-center space-x-8'>
						<Link
							to='#how-it-works'
							className='text-sm font-medium text-base-content hover:text-primary transition-colors'>
							How it Works
						</Link>
						<Link
							to='#features'
							className='text-sm font-medium text-base-content0 hover:text-primary transition-colors'>
							Features
						</Link>
						<Link
							to='#partners'
							className='text-sm font-medium text-base-content hover:text-primary transition-colors'>
							Partners
						</Link>

						<div className='flex items-center space-x-4 ml-4 pl-4 border-l border-base-content'>
							<Button className='bg-primary text-base-content border-1 border-primary' variant='ghost'>Sign In</Button>
							<Button className='bg-primary'>Get Started</Button>
						</div>
					</div>

					<div className='md:hidden flex items-center'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='text-slate-600'>
							{isOpen ? (
								<X className='w-6 h-6' />
							) : (
								<Menu className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>
			</div>

		
		</nav>
	);
}
