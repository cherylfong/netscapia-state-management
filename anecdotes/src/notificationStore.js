import { create } from 'zustand'

const useNotificationStore = create((set) => ({
    notify: '',
    actions: {
        setNotify: (message) => set(() => ({ notify: message })),
        clearNotify: () => {
            setTimeout(() => set(() => ({ notify: '' })), 5000)
        },
    },
})) 

export const useNotify = () => useNotificationStore(state => state.notify)

export const useNotifyActions = () => useNotificationStore(state => state.actions)