import { Compass, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
	return (
		<footer className='bg-base-100 border-t border-base-200 pt-16 pb-8 text-base-content'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'>
								<Compass className='w-5 h-5 text-base-content' />
							</div>
							<span className='font-bold text-xl text- tracking-tight'>
								UMA B2B
							</span>
						</div>
						<p className='text- text-sm leading-relaxed max-w-xs'>
							The premier B2B platform aggregating the world's best tour
							operators into one unified, lightning-fast dashboard.
						</p>
					</div>

					<div>
						<h3 className=' font-semibold mb-4'>Platform</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									to='#features'
									className='hover:text-primary transition-colors'>
									Features
								</Link>
							</li>
							<li>
								<Link
									to='#partners'
									className='hover:text-primary transition-colors'>
									Integrations
								</Link>
							</li>
							<li>
								<Link
									to='#pricing'
									className='hover:text-primary transition-colors'>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									to='/auth/login'
									className='hover:text-primary transition-colors'>
									Agent Login
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-base-content font-semibold mb-4'>Support</h3>
						<ul className='space-y-3 text-sm'>
							<li>
								<Link
									to='#faq'
									className='hover:text-primary transition-colors'>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='hover:text-primary transition-colors'>
									API Documentation
								</Link>
							</li>
							<li>
								<Link
									to='#'
									className='hover:text-primary transition-colors'>
									System Status
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='text-base-content font-semibold mb-4'>Contact</h3>
						<ul className='space-y-3 text-sm'>
							<li className='flex items-center gap-2'>
								<Mail className='w-4 h-4 text-primary' />
								<a
									href='mailto:support@umab2b.com'
									className='hover:text-base-content transition-colors'>
									support@umab2b.com
								</a>
							</li>
							<li className='flex items-center gap-2'>
								<Phone className='w-4 h-4 text-primary' />
								<span>+998 71 200 00 00</span>
							</li>
							<li className='flex items-center gap-2'>
								<MapPin className='w-4 h-4 text-primary' />
								<span>Tashkent, Uzbekistan</span>
							</li>
						</ul>
					</div>
				</div>

				<div className='pt-8 border-t border-primary flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-base-content'>
					<p>
						© {new Date().getFullYear()} UMA B2B Platform. All rights
						reserved.
					</p>
					<div className='flex gap-6'>
						<Link to='#' className='hover:text-base-content transition-colors'>
							Privacy Policy
						</Link>
						<Link to='#' className='hover:text-base-content transition-colors'>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
