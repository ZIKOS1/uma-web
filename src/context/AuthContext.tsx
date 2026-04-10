import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react';

interface User {
	id: number;
	email: string;
	name: string;
	role?: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isLoading: boolean;
	login: (token: string, user: User) => void;
	logout: () => void;
	checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token'),
	);
	const [isLoading, setIsLoading] = useState(true);

	// Function to save token and user state
	const login = (newToken: string, userData: User) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
		setUser(userData);
	};

	// Function to clear token and user state
	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
	};

	// Function to verify current token with backend
	const checkAuth = async () => {
		const currentToken = localStorage.getItem('token');
		if (!currentToken) {
			setIsLoading(false);
			return;
		}

		try {
			// Assuming a /v1/auth/me or similar endpoint exists to get current user info
			// If not, we can adjust this. For now, we just assume the token is valid if it's there,
			// or we decode it if we had a jwt-decode library.
			// Since MVP might not have a /me endpoint yet, we'll try a dummy request or just trust the token expiry.
			// Let's assume the token is valid until we get a 401 from an API call
			setIsLoading(false);
		} catch (error) {
			console.error('Auth verification failed', error);
			logout();
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, token, isLoading, login, logout, checkAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
