import { useState } from 'react'

export default function useToggleShowPassword() {
	const [showPassword, setShowPassword] = useState(false)

	const handleToggleShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return { handleToggleShowPassword, showPassword }
}
