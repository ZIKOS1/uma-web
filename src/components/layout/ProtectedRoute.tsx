import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
	const { token, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-slate-50'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
			</div>
		);
	}

	// If there's no token, redirect to the login page immediately
	if (!token) {
		return <Navigate to='/auth/login' replace />;
	}

	// Token exists, render the child routes (e.g. Dashboard)
	return <Outlet />;
}
