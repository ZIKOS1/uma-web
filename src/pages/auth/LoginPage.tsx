import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Compass, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await api.post('/api/v1/auth/agent/login', {
				email,
				password,
			});

			if (response.data.success) {
				login(
					response.data.data.token,
					response.data.data.agent || { id: 0, email, name: 'Agent' },
				);
				navigate('/dashboard');
			}
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					'Failed to login. Please check your credentials.',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50'>
			{/* Visual Side */}
			<div className='hidden lg:flex flex-col justify-between p-12 bg-blue-600 relative overflow-hidden'>
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d4598eb7?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
				<div className='absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent' />

				<div className='relative z-10'>
					<Link to='/' className='flex items-center gap-2 mb-12'>
						<div className='w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg'>
							<Compass className='w-6 h-6 text-blue-600' />
						</div>
						<span className='font-bold text-2xl text-white tracking-tight'>
							UMA B2B
						</span>
					</Link>
					<div className='space-y-6'>
						<h1 className='text-4xl lg:text-5xl text-white font-bold leading-tight'>
							Welcome back to your command center.
						</h1>
						<p className='text-blue-100 text-lg max-w-lg leading-relaxed'>
							Login to access the unified BedBank search, monitor your
							team's quotes, and manage your agency settings.
						</p>
					</div>
				</div>

				<div className='relative z-10 text-blue-200 text-sm'>
					© {new Date().getFullYear()} UMA Platform. Exclusive B2B Access.
				</div>
			</div>

			{/* Form Side */}
			<div className='flex items-center justify-center p-6 sm:p-12 lg:p-16 relative'>
				<div className='w-full max-w-md'>
					{/* Mobile Logo */}
					<Link
						to='/'
						className='lg:hidden flex justify-center items-center gap-2 mb-12'>
						<div className='w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center'>
							<Compass className='w-6 h-6 text-white' />
						</div>
						<span className='font-bold text-2xl text-slate-900 tracking-tight'>
							UMA B2B
						</span>
					</Link>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}>
						<h2 className='text-3xl font-bold text-slate-900 mb-2'>
							Agent Login
						</h2>
						<p className='text-slate-500 mb-8'>
							Enter your credentials to access the portal.
						</p>

						<form onSubmit={handleLogin} className='space-y-5'>
							{error && (
								<div className='p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-600 text-sm'>
									<AlertCircle className='w-5 h-5 shrink-0' />
									<p>{error}</p>
								</div>
							)}

							<div className='space-y-2'>
								<label className='text-sm font-medium text-slate-700'>
									Email Address
								</label>
								<div className='relative'>
									<Mail className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
									<input
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder='agency@example.com'
										className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<label className='text-sm font-medium text-slate-700'>
										Password
									</label>
									<Link
										to='#'
										className='text-sm font-medium text-blue-600 hover:text-blue-700'>
										Forgot password?
									</Link>
								</div>
								<div className='relative'>
									<Lock className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
									<input
										type={showPassword ? 'text' : 'password'}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder='••••••••'
										className='w-full pl-10 pr-12 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
										required
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-3 text-slate-400 hover:text-slate-600'>
										{showPassword ? (
											<EyeOff className='w-5 h-5' />
										) : (
											<Eye className='w-5 h-5' />
										)}
									</button>
								</div>
							</div>

							<div className='flex items-center gap-2 mt-4'>
								<input
									type='checkbox'
									id='remember'
									className='w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500'
								/>
								<label
									htmlFor='remember'
									className='text-sm text-slate-600'>
									Remember me for 30 days
								</label>
							</div>

							<Button
								type='submit'
								size='lg'
								disabled={loading}
								className='w-full h-12 text-base mt-6 shadow-lg shadow-blue-500/20'>
								{loading ? 'Authenticating...' : 'Sign In'}
							</Button>
						</form>

						<div className='mt-8 text-center text-slate-600'>
							<p className='text-sm'>
								Don't have an account?{' '}
								<Link
									to='/auth/register'
									className='font-semibold text-blue-600 hover:text-blue-700 transition-colors'>
									Request access
								</Link>
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
