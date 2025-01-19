import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'

export default function useUser() {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error('UserContext must be used within a UserContextProvider')
	}

	const { userId, setUserId, email, setEmail, password, setPassword } = context

	return { userId, setUserId, email, setEmail, password, setPassword }
}
