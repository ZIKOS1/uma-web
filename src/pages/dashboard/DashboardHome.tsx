import { motion } from 'framer-motion';
import { Search, Compass, Clock, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export function DashboardHome() {
	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-slate-900'>
					Dashboard Overview
				</h1>
				<p className='text-slate-500 mt-1'>
					Welcome back. Here's what's happening today.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
				{[
					{
						label: 'Total Searches',
						value: '1,284',
						icon: Search,
						trend: '+12%',
						color: 'text-blue-600',
						bg: 'bg-blue-100',
					},
					{
						label: 'Saved Favorites',
						value: '42',
						icon: Star,
						trend: '+4',
						color: 'text-amber-500',
						bg: 'bg-amber-100',
					},
					{
						label: 'Active Quotes',
						value: '18',
						icon: Compass,
						trend: 'Steady',
						color: 'text-emerald-600',
						bg: 'bg-emerald-100',
					},
					{
						label: 'Conversion Rate',
						value: '8.4%',
						icon: TrendingUp,
						trend: '+1.2%',
						color: 'text-purple-600',
						bg: 'bg-purple-100',
					},
				].map((stat, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
						<div
							className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
							<stat.icon className={`w-6 h-6 ${stat.color}`} />
						</div>
						<p className='text-slate-500 text-sm font-medium'>
							{stat.label}
						</p>
						<div className='flex items-baseline gap-2 mt-1'>
							<h3 className='text-2xl font-bold text-slate-900'>
								{stat.value}
							</h3>
							<span className='text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full'>
								{stat.trend}
							</span>
						</div>
					</motion.div>
				))}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2 space-y-4'>
					<div className='flex items-center justify-between'>
						<h2 className='text-lg font-bold text-slate-900'>
							Recent 	
						</h2>
						<Link
							to='/dashboard/history'
							className='text-sm font-medium text-blue-600 hover:text-blue-700'>
							View All
						</Link>
					</div>
					<div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden'>
						<div className='p-8 text-center text-slate-500 flex flex-col items-center'>
							<Clock className='w-8 h-8 mx-auto mb-3 text-slate-400 opacity-50' />
							<p>No recent searches found.</p>
							<Link to='/dashboard/search' className='mt-4'>
								<Button variant='outline'>Start a new search</Button>
							</Link>
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					<h2 className='text-lg font-bold text-slate-900'>
						System Status
					</h2>
					<div className='bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4'>
						{[
							{ name: 'CrystalBay API', status: 'Operational' },
							{ name: 'KompasTour', status: 'Operational' },
							{ name: 'PacGroup', status: 'Operational' },
							{ name: 'Rayna B2B', status: 'Operational' },
						].map((sys, i) => (
							<div key={i} className='flex items-center justify-between'>
								<span className='text-sm font-medium text-slate-700'>
									{sys.name}
								</span>
								<div className='flex items-center gap-2'>
									<span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
									<span className='text-xs text-slate-500'>
										{sys.status}
									</span>
								</div>
							</div>
						))}
						<div className='pt-4 mt-4 border-t border-slate-100 text-center'>
							<span className='text-xs text-slate-400'>
								All 9 BedBanks are online.
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
