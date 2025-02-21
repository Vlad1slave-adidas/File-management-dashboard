import FilesSection from '@/components/sections/FilesSection'
import FoldersSection from '@/components/sections/FoldersSection'
import ButtonAddFiles from '@/components/ui/buttons/ButtonAddFiles'
import ButtonCreateFolder from '@/components/ui/buttons/ButtonCreateFolder'
import FolderCard from '@/components/ui/cards/FolderCard'
import { getFiles } from '@/lib/actions/file.actions'
import { getFolderHierarchy, getFolders } from '@/lib/actions/folder.actions'
import { getLoggedInUser } from '@/lib/server/appwrite'
import { getFileIcon, getFileType } from '@/lib/utils/getFileType'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function DashboardPage() {
	const currentUser = await getLoggedInUser()
	// console.log('🚀 ~ DashboardPage ~ currentUser:', currentUser)

	if (!currentUser) {
		redirect('/sign-in')
	}

	const folders = await getFolders()
	console.log('🚀 ~ DashboardPage ~ folders:', folders)

	const folderHierarchy = await getFolderHierarchy()
	console.log('🚀 ~ DashboardPage ~ folderHierarchy:', folderHierarchy)

	const files = await getFiles()
	const fileTypes = files.documents.map(file => getFileType(file.name))
	const fileIcons = fileTypes.map(file =>
		getFileIcon(file.extension, file.type)
	)
	return (
		<div className='flex flex-col h-[calc(100%-96px)]'>
			<div className='flex justify-between mb-2'>
				<h2>My Cloud</h2>
				<div className='flex gap-3'>
					<ButtonCreateFolder accountId={currentUser.accountId} />
					<ButtonAddFiles
						ownerId={currentUser.$id}
						accountId={currentUser.accountId}
					/>
				</div>
			</div>

			<p className='text-gray-default mb-5'>{`Hi ${currentUser.name}, Welcome Back!`}</p>

			<div className='mb-5'>
				<FoldersSection folders={folderHierarchy} />
			</div>

			{/* <div className='flex mb-10'>
				<DiskCard />
			</div> */}

			<FilesSection files={files} fileIcons={fileIcons} />
		</div>
	)
}
