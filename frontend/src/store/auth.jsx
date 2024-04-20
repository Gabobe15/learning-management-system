import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

const useAuthStore = create((set, get) => ({
	allUserData: null,
	loading: false,

	user: () => ({
		user_id: get().allUserData?.user_id || null,
		username: get().allUserData?.username || null,
	}),

	setUser: (user) =>
		set({
			allUserData: user,
		}),

	setLoading: (loading) => set({ loading }),

	// loggein if allUserData is not null
	isLoggedIn: () => get().allUserData !== null,
}));

// we run this in development environment
if (import.meta.env.Dev) {
	mountStoreDevtool('Store', useAuthStore);
}

export { useAuthStore };
