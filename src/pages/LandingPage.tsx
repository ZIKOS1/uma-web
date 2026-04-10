import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Plane, ShieldCheck, Zap } from 'lucide-react';

const fadeInUp = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

export function LandingPage() {
	return (
		<div className='min-h-screen bg-slate-50 font-sans selection:bg-blue-200'>
			<Navbar />

			<main>
				{/* HERO SECTION */}
				<section className='relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100 -z-10' />
					<div className='absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10' />

					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center'>
						<motion.div
							initial='hidden'
							animate='visible'
							variants={staggerContainer}
							className='max-w-4xl mx-auto'>
							<motion.div
								variants={fadeInUp}
								className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6'>
								<span className='relative flex h-2 w-2'>
									<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75'></span>
									<span className='relative inline-flex rounded-full h-2 w-2 bg-blue-600'></span>
								</span>
								B2B Portal for Travel Agents v2.0
							</motion.div>

							<motion.h1
								variants={fadeInUp}
								className='text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8'>
								Unify Your Tour Search{' '}
								<br className='hidden md:block' />
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'>
									Multiply Your Sales
								</span>
							</motion.h1>

							<motion.p
								variants={fadeInUp}
								className='text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed'>
								Connect to 9+ premium BedBanks simultaneously. Find the
								perfect tour, generate beautiful client offers, and
								close deals faster than ever before.
							</motion.p>

							<motion.div
								variants={fadeInUp}
								className='flex flex-col sm:flex-row items-center justify-center gap-4'>
								<Button
									size='lg'
									className='w-full sm:w-auto text-base gap-2 group'>
									Become a Partner
									<ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								</Button>
								<Button
									size='lg'
									variant='outline'
									className='w-full sm:w-auto text-base'>
									View Live Demo
								</Button>
							</motion.div>
						</motion.div>

						{/* Hero Image / Dashboard Mockup Preview */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							className='mt-16 sm:mt-24 mx-auto max-w-5xl rounded-xl border border-slate-200/50 bg-white/50 p-2 sm:p-4 shadow-2xl backdrop-blur-sm'>
							<div className='overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5'>
								<div className='w-full h-[300px] sm:h-[500px] bg-slate-50 relative flex items-center justify-center'>
									<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
									<div className='text-center z-10 px-4'>
										<Plane className='w-12 h-12 text-blue-500 mx-auto mb-4 opacity-50' />
										<h3 className='text-xl font-medium text-slate-400'>
											Interactive Dashboard View
										</h3>
										<p className='text-slate-400 mt-2 text-sm'>
											Tour Search Interface Demo Loading...
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* FEATURES SECTION */}
				<section id='features' className='py-24 bg-white'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='text-center mb-16'>
							<h2 className='text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl'>
								Everything you need to sell more tours.
							</h2>
							<p className='mt-4 text-lg text-slate-600 max-w-2xl mx-auto'>
								Skip the manual search across dozens of tabs. Our
								unified platform brings the market to your fingertips.
							</p>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{[
								{
									icon: Zap,
									title: 'Lightning Fast Search',
									desc: 'Query 9+ tour operators concurrently. Get realtime availability and pricing in seconds, not hours.',
									color: 'text-amber-500',
									bg: 'bg-amber-100',
								},
								{
									icon: Globe2,
									title: 'Global Coverage',
									desc: 'Direct integrations with PacGroup, Kompas, Rayna, MalvaTour, and more. 100+ countries supported.',
									color: 'text-blue-500',
									bg: 'bg-blue-100',
								},
								{
									icon: ShieldCheck,
									title: 'Verified B2B Only',
									desc: 'Strictly for registered agents. Protect your margins and get dedicated B2B prices with zero B2C interference.',
									color: 'text-emerald-500',
									bg: 'bg-emerald-100',
								},
							].map(({ icon: Icon, title, desc, color, bg }, idx) => (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.2 }}
									key={idx}
									className='bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow'>
									<div
										className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-6`}>
										<Icon className={`w-6 h-6 ${color}`} />
									</div>
									<h3 className='text-xl font-semibold text-slate-900 mb-3'>
										{title}
									</h3>
									<p className='text-slate-600 leading-relaxed'>
										{desc}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* PARTNERS SECTION */}
				<section
					id='partners'
					className='py-24 bg-base-100 overflow-hidden relative'>
					<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_100%)]' />
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center'>
						<h2 className='text-3xl font-bold text-white mb-4'>
							Integrated with Industry Leaders
						</h2>
						<p className='text-slate-400 mb-16 max-w-2xl mx-auto'>
							We've built robust API connections to the travel industry's
							most reliable BedBanks and operators.
						</p>

						<div className='flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500'>
							{[
								'Kompas Tour',
								'Pac Group',
								'Malva Tour',
								'Rayna B2B',
								'Crystal Bay',
								'Salambo',
							].map((partner, i) => (
								<div
									key={i}
									className='text-xl md:text-2xl font-black text-slate-200 tracking-wider'>
									{partner.toUpperCase()}
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA SECTION */}
				<section className='py-24 bg-white relative overflow-hidden'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
						<h2 className='text-3xl md:text-5xl font-bold text-slate-900 mb-6'>
							Ready to upgrade your agency?
						</h2>
						<p className='text-xl text-slate-600 mb-8 max-w-2xl mx-auto'>
							Join hundreds of travel agents saving hours daily with the
							UMA B2B Search network.
						</p>
						<Button
							size='lg'
							className='h-14 px-8 text-lg rounded-full shadow-xl shadow-blue-500/20'>
							Register Agency Output{' '}
							<ArrowRight className='w-5 h-5 ml-2' />
						</Button>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
