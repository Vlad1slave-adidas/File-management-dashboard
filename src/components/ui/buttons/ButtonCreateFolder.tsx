'use client'

import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import Modal from '../modal/Modal'
import CreateFolderForm from '../forms/CreateFolderForm'

export default function ButtonCreateFolder({
	accountId,
}: {
	accountId: string
}) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setIsOpen(true)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<>
			<button
				onClick={handleOpen}
				className='cursor-pointer flex items-center gap-2 hover:bg-second-primary-hover transition-colors duration-75 ease-linear rounded-3xl font-medium text-sm bg-second-primary px-5 py-2 text-white '
			>
				<PlusCircle width={18} height={18} />
				<span>Create Folder</span>
			</button>

			<Modal
				isOpen={isOpen}
				handler={handleClose}
				content={<CreateFolderForm accountId={accountId} />}
			/>
		</>
	)
}
