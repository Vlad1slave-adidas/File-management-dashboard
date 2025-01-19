import ButtonAddFiles from '@/components/ui/buttons/ButtonAddFiles'
import NotificationButton from '@/components/ui/buttons/NotificationButton'
import DiskCard from '@/components/ui/cards/DiskCard'
import SearchField from '@/components/ui/fields/SearchField'
import Profile from '@/components/ui/profile/Profile'
import { signOut } from '@/lib/actions/auth.actions'
import { getLoggedInUser } from '@/lib/server/appwrite'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardPage() {
	const user = await getLoggedInUser()

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<div>
			{/* <form action={signOut}>
				<button type='submit'>Log out</button>
			</form> */}

			<div className='flex justify-between mb-12'>
				<SearchField />
				<div className='flex items-center gap-8'>
					<NotificationButton />
					<Profile />
				</div>
			</div>

			<div className='flex justify-between mb-8'>
				<h2>My Cloud</h2>
				<ButtonAddFiles />
			</div>

			<div className='flex'>
				<DiskCard />
			</div>

			{/* <h2>Recent Added</h2>
			<DropdownButton /> */}

			{/* <FilesTable /> */}
		</div>
	)
}
