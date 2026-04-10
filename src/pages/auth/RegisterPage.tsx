import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
	Compass,
	Eye,
	EyeOff,
	Lock,
	Mail,
	Phone,
	User,
	Building,
	AlertCircle,
} from 'lucide-react';
import { api } from '../../services/api';

export function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		companyName: '',
		email: '',
		phone: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await api.post(
				'/api/v1/auth/agent/register',
				formData,
			);

			if (response.data.success) {
				// Redirect to login after successful registration
				navigate('/auth/login', {
					state: { message: 'Registration successful! Please login.' },
				});
			}
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					'Failed to register. Please try again later.',
			);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50'>
			{/* Visual Side */}
			<div className='hidden lg:flex flex-col justify-between p-12 bg-blue-600 relative overflow-hidden'>
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20" />
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
							Join the elite network of travel professionals.
						</h1>
						<p className='text-blue-100 text-lg max-w-lg leading-relaxed'>
							Get instant access to 9+ integrated BedBanks, generate
							quotes in seconds, and scale your agency's revenue.
						</p>
					</div>
				</div>

				<div className='relative z-10 text-blue-200 text-sm'>
					© {new Date().getFullYear()} UMA Platform. Dedicated exclusively
					to verified B2B agents.
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
							Create your account
						</h2>
						<p className='text-slate-500 mb-8'>
							Enter your agency details to request access.
						</p>

						<form onSubmit={handleRegister} className='space-y-5'>
							{error && (
								<div className='p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-600 text-sm'>
									<AlertCircle className='w-5 h-5 shrink-0' />
									<p>{error}</p>
								</div>
							)}

							<div className='grid grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-slate-700'>
										First Name
									</label>
									<div className='relative'>
										<User className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
										<input
											type='text'
											name='firstName'
											value={formData.firstName}
											onChange={handleChange}
											placeholder='John'
											className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
											required
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-slate-700'>
										Last Name
									</label>
									<div className='relative'>
										<User className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
										<input
											type='text'
											name='lastName'
											value={formData.lastName}
											onChange={handleChange}
											placeholder='Doe'
											className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
											required
										/>
									</div>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-slate-700'>
									Agency / Company Name
								</label>
								<div className='relative'>
									<Building className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
									<input
										type='text'
										name='companyName'
										value={formData.companyName}
										onChange={handleChange}
										placeholder='Wanderlust Travels LLC'
										className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-slate-700'>
									Email Address
								</label>
								<div className='relative'>
									<Mail className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
									<input
										type='email'
										name='email'
										value={formData.email}
										onChange={handleChange}
										placeholder='agency@example.com'
										className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-slate-700'>
									Phone Number
								</label>
								<div className='relative'>
									<Phone className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
									<input
										type='tel'
										name='phone'
										value={formData.phone}
										onChange={handleChange}
										placeholder='+998 90 123 45 67'
										className='w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-medium text-slate-700'>
									Password
								</label>
								<div className='relative'>
									<Lock className='absolute left-3 top-3 w-5 h-5 text-slate-400' />
									<input
										type={showPassword ? 'text' : 'password'}
										name='password'
										value={formData.password}
										onChange={handleChange}
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
								<p className='text-xs text-slate-500'>
									Must be at least 8 characters long.
								</p>
							</div>

							<Button
								type='submit'
								size='lg'
								disabled={loading}
								className='w-full h-12 text-base mt-4 shadow-lg shadow-blue-500/20'>
								{loading
									? 'Submitting...'
									: 'Submit Registration Request'}
							</Button>
						</form>

						<div className='mt-8 text-center text-slate-600'>
							<p className='text-sm'>
								Already approved?{' '}
								<Link
									to='/auth/login'
									className='font-semibold text-blue-600 hover:text-blue-700 transition-colors'>
									Sign in securely
								</Link>
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
