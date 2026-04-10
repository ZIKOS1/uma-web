import React, { useState } from 'react';
import {
	Search,
	MapPin,
	Calendar,
	Users,
	Moon,
	Loader2,
	AlertCircle,
	Building2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { api } from '../../services/api';

interface TourResult {
	provider: string;
	label: string;
	status: 'success' | 'error';
	error?: string;
	tours: any[];
	totalPages: number;
	rows: number;
}

export function SearchTours() {
	const [formData, setFormData] = useState({
		countryName: '',
		city: '',
		dateFrom: '',
		dateTo: '',
		nightsMin: 7,
		nightsMax: 14,
		adults: 2,
		children: 0,
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [results, setResults] = useState<TourResult[] | null>(null);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setResults(null);

		try {
			// Create request payload mapped to backend expectations
			const payload = {
				...formData,
				// Backend expects countryName or countryEn
				countryEn: formData.countryName,
			};

			const response = await api.post('/api/v1/tour/search', payload);

			if (response.data.success) {
				setResults(response.data.data);
			} else {
				setError(response.data.message || 'Failed to search tours');
			}
		} catch (err: any) {
			setError(
				err.response?.data?.message ||
					'An error occurred while connecting to the BedBanks.',
			);
		} finally {
			setLoading(false);
		}
	};

	// Flatten out all tours perfectly for universal display
	const allTours =
		results?.flatMap((r) =>
			(r.tours || []).map((t) => ({
				...t,
				_providerLabel: r.label,
				_providerId: r.provider,
			})),
		) || [];

	return (
		<div className='space-y-6 max-w-6xl mx-auto'>
			<div>
				<h1 className='text-2xl font-bold text-primary'>
					Unified Tour Search
				</h1>
				<p className='text-slate-500 mt-1'>
					Search exactly once. We query 9 BedBanks simultaneously.
				</p>
			</div>

			<div className='bg-white p-6 rounded-2xl border border-slate-200 shadow-sm'>
				<form
					onSubmit={handleSearch}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Destination */}
					<div className='space-y-2 lg:col-span-2'>
						<label className='text-sm font-medium text-slate-700'>
							Destination (Country / City)
						</label>
						<div className='flex gap-2'>
							<div className='relative flex-1'>
								<MapPin className='absolute left-3 top-2.5 w-5 h-5 text-slate-400' />
								<select
									className='w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
									value={formData.countryName}
									onChange={(e) =>
										setFormData({
											...formData,
											countryName: e.target.value,
										})
									}
									required>
									<option value=''>Select Country</option>
									<option value='Turkey'>Turkey</option>
									<option value='Egypt'>Egypt</option>
									<option value='UAE'>UAE</option>
									<option value='Thailand'>Thailand</option>
									<option value='Maldives'>Maldives</option>
									<option value='Uzbekistan'>Uzbekistan</option>
								</select>
							</div>
							<div className='relative flex-1'>
								<input
									type='text'
									placeholder='City / Resort (Optional)'
									className='w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
									value={formData.city}
									onChange={(e) =>
										setFormData({ ...formData, city: e.target.value })
									}
								/>
							</div>
						</div>
					</div>

					{/* Dates */}
					<div className='space-y-2 lg:col-span-2'>
						<label className='text-sm font-medium text-slate-700'>
							Departure Window
						</label>
						<div className='flex items-center gap-2'>
							<div className='relative flex-1'>
								<Calendar className='absolute left-3 top-2.5 w-5 h-5 text-slate-400' />
								<input
									type='date'
									className='w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700'
									value={formData.dateFrom}
									onChange={(e) =>
										setFormData({
											...formData,
											dateFrom: e.target.value,
										})
									}
									required
								/>
							</div>
							<span className='text-slate-400'>-</span>
							<div className='relative flex-1'>
								<Calendar className='absolute left-3 top-2.5 w-5 h-5 text-slate-400' />
								<input
									type='date'
									className='w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700'
									value={formData.dateTo}
									onChange={(e) =>
										setFormData({
											...formData,
											dateTo: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>
					</div>

					{/* Duration */}
					<div className='space-y-2'>
						<label className='text-sm font-medium text-slate-700'>
							Nights
						</label>
						<div className='flex items-center gap-2'>
							<div className='relative flex-1'>
								<Moon className='absolute left-3 top-2.5 w-5 h-5 text-slate-400' />
								<input
									type='number'
									min='1'
									className='w-full pl-10 pr-2 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
									value={formData.nightsMin}
									onChange={(e) =>
										setFormData({
											...formData,
											nightsMin: parseInt(e.target.value),
										})
									}
								/>
							</div>
							<span className='text-slate-400'>-</span>
							<input
								type='number'
								min={formData.nightsMin}
								className='w-full px-2 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
								value={formData.nightsMax}
								onChange={(e) =>
									setFormData({
										...formData,
										nightsMax: parseInt(e.target.value),
									})
								}
							/>
						</div>
					</div>

					{/* Passengers */}
					<div className='space-y-2 lg:col-span-2'>
						<label className='text-sm font-medium text-slate-700'>
							Passengers
						</label>
						<div className='flex gap-4'>
							<div className='relative flex-1'>
								<Users className='absolute left-3 top-2.5 w-5 h-5 text-slate-400' />
								<div className='flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden'>
									<span className='pl-10 pr-2 py-2 text-sm text-slate-600 bg-slate-50 border-r border-slate-200'>
										Adults
									</span>
									<input
										type='number'
										min='1'
										className='w-full px-3 py-2 focus:outline-none'
										value={formData.adults}
										onChange={(e) =>
											setFormData({
												...formData,
												adults: parseInt(e.target.value),
											})
										}
									/>
								</div>
							</div>
							<div className='relative flex-1'>
								<Users className='absolute left-3 top-2.5 w-5 h-5 text-slate-400' />
								<div className='flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden'>
									<span className='pl-10 pr-2 py-2 text-sm text-slate-600 bg-slate-50 border-r border-slate-200'>
										Children
									</span>
									<input
										type='number'
										min='0'
										className='w-full px-3 py-2 focus:outline-none'
										value={formData.children}
										onChange={(e) =>
											setFormData({
												...formData,
												children: parseInt(e.target.value),
											})
										}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Submit */}
					<div className='space-y-2 lg:col-span-4 flex justify-end pt-4 border-t border-slate-100'>
						<Button
							type='submit'
							size='lg'
							disabled={loading}
							className='w-full sm:w-auto px-8 gap-2'>
							{loading ? (
								<Loader2 className='w-5 h-5 animate-spin' />
							) : (
								<Search className='w-5 h-5' />
							)}
							{loading ? 'Searching...' : 'Search 9 Providers'}
						</Button>
					</div>
				</form>
			</div>

			{error && (
				<div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3'>
					<AlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
					<p>{error}</p>
				</div>
			)}

			{/* Results Render */}
			{!loading && results && (
				<div className='space-y-4'>
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-bold text-slate-900'>
							Found {allTours.length} Tours
						</h2>
						<div className='flex items-center gap-2 text-sm text-slate-500'>
							<span>Searched {results.length} providers</span>
						</div>
					</div>

					{allTours.length > 0 ? (
						<div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
							<div className='overflow-x-auto'>
								<table className='w-full text-left text-sm whitespace-nowrap'>
									<thead className='bg-slate-50 text-slate-600 font-medium border-b border-slate-200'>
										<tr>
											<th className='px-6 py-4'>Provider</th>
											<th className='px-6 py-4'>Hotel</th>
											<th className='px-6 py-4'>Dates</th>
											<th className='px-6 py-4'>Room / Board</th>
											<th className='px-6 py-4 text-right'>Price</th>
											<th className='px-6 py-4'></th>
										</tr>
									</thead>
									<tbody className='divide-y divide-slate-100'>
										{allTours.map((tour, idx) => (
											<tr
												key={idx}
												className='hover:bg-slate-50 transition-colors'>
												<td className='px-6 py-4'>
													<span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-medium text-xs'>
														<Building2 className='w-3.5 h-3.5' />
														{tour._providerLabel}
													</span>
												</td>
												<td className='px-6 py-4'>
													<p className='font-semibold text-slate-900 truncate max-w-[200px]'>
														{tour.hotelName ||
															tour.hotel ||
															'Unknown Hotel'}
													</p>
													<p className='text-xs text-slate-500'>
														{tour.resort || tour.city || ''}
													</p>
												</td>
												<td className='px-6 py-4 text-slate-600'>
													{tour.dateBegin || tour.date || 'N/A'} •{' '}
													{tour.nights || '?'} nights
												</td>
												<td className='px-6 py-4'>
													<p className='text-slate-900 truncate max-w-[150px]'>
														{tour.roomType ||
															tour.room ||
															'Standard'}
													</p>
													<p className='text-xs text-slate-500'>
														{tour.mealName ||
															tour.meal ||
															tour.board ||
															'BB'}
													</p>
												</td>
												<td className='px-6 py-4 text-right'>
													<p className='font-bold text-slate-900 text-base'>
														{tour.price || tour.totalPrice || 0}{' '}
														{tour.currency || 'USD'}
													</p>
												</td>
												<td className='px-6 py-4 text-right'>
													<Button variant='outline' size='sm'>
														Details
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : (
						<div className='bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center'>
							<p className='text-slate-500 font-medium'>
								No tours found matching your criteria.
							</p>
							<p className='text-sm text-slate-400 mt-1'>
								Try expanding your dates or changing the destination.
							</p>
						</div>
					)}
				</div>
			)}

			{/* Initial empty state placeholder */}
			{!loading && !results && !error && (
				<div className='bg-slate-50 border border-dashed border-slate-300 rounded-xl p-12 text-center'>
					<p className='text-slate-500'>
						Run a search to see live tour availability.
					</p>
				</div>
			)}
		</div>
	);
}
