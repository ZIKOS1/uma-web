import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
	Compass,
	LayoutDashboard,
	Search,
	History,
	Star,
	Settings,
	LogOut,
	Menu,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function DashboardLayout() {
	const { user, logout } = useAuth();
	const [sidebarOpen, setSidebarOpen] = React.useState(false);

	const navigation = [
		{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
		{ name: 'Search Tours', href: '/dashboard/search', icon: Search },
		{ name: 'My History', href: '/dashboard/history', icon: History },
		{ name: 'Favorites', href: '/dashboard/favorites', icon: Star },
		{ name: 'Settings', href: '/dashboard/settings', icon: Settings },
	];

	return (
		<div className='min-h-screen bg-error flex'>
			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div
					className='fixed inset-0 z-20 bg-slate-900/50 lg:hidden backdrop-blur-sm'
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 flex flex-col',
					sidebarOpen ? 'translate-x-0' : '-translate-x-full',
				)}>
				<div className='h-16 flex items-center px-6 border-b border-slate-200'>
					<div className='flex items-center gap-2'>
						<div className='w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center'>
							<Compass className='w-5 h-5 text-white' />
						</div>
						<span className='font-bold text-xl text-slate-900 tracking-tight'>
							UMA
						</span>
						<span className='px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-700 ml-2'>
							B2B
						</span>
					</div>
				</div>

				<div className='flex-1 overflow-y-auto py-4 px-3 space-y-1'>
					{navigation.map((item) => (
						<NavLink
							key={item.name}
							to={item.href}
							end={item.href === '/dashboard'}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
									isActive
										? 'bg-blue-50 text-blue-700'
										: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
								)
							}>
							<item.icon className='w-5 h-5 shrink-0' />
							{item.name}
						</NavLink>
					))}
				</div>

				<div className='p-4 border-t border-slate-200'>
					<div className='flex items-center gap-3 mb-4 px-2'>
						<div className='w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0'>
							<span className='text-sm font-medium text-slate-600'>
								{user?.name?.charAt(0) || 'A'}
							</span>
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-medium text-slate-900 truncate'>
								{user?.name || 'Agent User'}
							</p>
							<p className='text-xs text-slate-500 truncate'>
								{user?.email || 'agent@example.com'}
							</p>
						</div>
					</div>
					<Button
						variant='ghost'
						className='w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50'
						onClick={logout}>
						<LogOut className='w-4 h-4 mr-2' />
						Sign Out
					</Button>
				</div>
			</div>

			{/* Main Content Area */}
			<div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
				{/* Mobile Header */}
				<div className='lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0'>
					<div className='flex items-center gap-2'>
						<div className='w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center'>
							<Compass className='w-5 h-5 text-white' />
						</div>
						<span className='font-bold text-lg text-slate-900'>UMA</span>
					</div>
					<button
						onClick={() => setSidebarOpen(true)}
						className='p-2 -mr-2 text-slate-600'>
						<Menu className='w-6 h-6' />
					</button>
				</div>

				<main className='flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
