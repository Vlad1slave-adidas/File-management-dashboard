import { createSessionClient, getLoggedInUser } from '@/lib/server/appwrite'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function signOut() {
	'use server'

	const { account } = await createSessionClient()

	cookies().delete('my-custom-session')
	await account.deleteSession('current')

	redirect('/sign-in')
}

export default async function DashboardPage() {
	const user = await getLoggedInUser()

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<div>
			<div>DashboardPage</div>
			<form action={signOut}>
				<button type='submit'>Log out</button>
			</form>
		</div>
	)
}
