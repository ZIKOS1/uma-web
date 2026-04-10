import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { SearchTours } from './pages/dashboard/SearchTours';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className='min-h-screen bg-background text-foreground font-sans antialiased bg-color-base-100'>
					<Routes>
						{/* Public Routes */}
						<Route path='/' element={<LandingPage />} />
						<Route path='/auth/login' element={<LoginPage />} />
						<Route path='/auth/register' element={<RegisterPage />} />

						{/* Protected Routes */}
						<Route element={<ProtectedRoute />}>
							<Route element={<DashboardLayout />}>
								<Route path='/dashboard' element={<DashboardHome />} />
								<Route
									path='/dashboard/search'
									element={<SearchTours />}
								/>
								<Route
									path='/dashboard/history'
									element={
										<div className='p-4 text-xl'>
											History View (Placeholder)
										</div>
									}
								/>
								<Route
									path='/dashboard/favorites'
									element={
										<div className='p-4 text-xl'>
											Favorites View (Placeholder)
										</div>
									}
								/>
								<Route
									path='/dashboard/settings'
									element={
										<div className='p-4 text-xl'>
											Settings (Placeholder)
										</div>
									}
								/>
							</Route>
						</Route>

						{/* Ensure unmatched dashboard routes redirect nicely or 404 */}
						<Route path='*' element={<Navigate to='/' replace />} />
					</Routes>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
