import FilesSection from '@/components/sections/FilesSection'
import ButtonAddFiles from '@/components/ui/buttons/ButtonAddFiles'
import ButtonCreateFolder from '@/components/ui/buttons/ButtonCreateFolder'
import DiskCard from '@/components/ui/cards/DiskCard'
import { getFiles } from '@/lib/actions/file.actions'
import { signOut } from '@/lib/actions/user.actions'
import { getLoggedInUser } from '@/lib/server/appwrite'
import { getFileIcon, getFileType } from '@/lib/utils/getFileType'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardPage() {
	const currentUser = await getLoggedInUser()
	console.log('🚀 ~ DashboardPage ~ currentUser:', currentUser)

	if (!currentUser) {
		redirect('/sign-in')
	}

	const files = await getFiles()
	const fileTypes = files.documents.map(file => getFileType(file.name))
	const fileIcons = fileTypes.map(file =>
		getFileIcon(file.extension, file.type)
	)
	return (
		<div className='flex flex-col h-[calc(100%-96px)]'>
			{/* <form action={signOut}>
				<button type='submit'>Log out</button>
			</form> */}

			<div className='flex justify-between mb-8'>
				<h2>My Cloud</h2>
				<div className='flex gap-3'>
					<ButtonCreateFolder />
					<ButtonAddFiles
						ownerId={currentUser.$id}
						accountId={currentUser.accountId}
					/>
				</div>
			</div>

			{/* <div className='flex mb-10'>
				<DiskCard />
			</div> */}

			<FilesSection files={files} fileIcons={fileIcons} />
		</div>
	)
}
