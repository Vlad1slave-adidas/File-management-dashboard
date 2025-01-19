'use client'

import { createContext, SetStateAction, useState } from 'react'

type ContextProviderProps = {
	children: React.ReactNode
}

type UserContextType = {
	userId: string | null
	setUserId: React.Dispatch<SetStateAction<string | null>>
	email: string | null
	setEmail: React.Dispatch<SetStateAction<string | null>>
	password: string | null
	setPassword: React.Dispatch<SetStateAction<string | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: ContextProviderProps) => {
	const [userId, setUserId] = useState<string | null>(null)
	const [email, setEmail] = useState<string | null>(null)
	const [password, setPassword] = useState<string | null>(null)

	return (
		<UserContext.Provider
			value={{ userId, setUserId, email, setEmail, password, setPassword }}
		>
			{children}
		</UserContext.Provider>
	)
}
