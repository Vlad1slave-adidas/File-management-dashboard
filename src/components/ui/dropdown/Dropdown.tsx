import { signOut } from '@/lib/actions/user.actions'
import React from 'react'

export default function Dropdown() {
	return (
		<form
			className='absolute b-0 bg-white p-2 rounded-sm border border-gray-200'
			action={signOut}
		>
			<button type='submit'>Logout</button>
		</form>
	)
}
