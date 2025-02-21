'use client'

import { createFolder } from '@/lib/actions/folder.actions'
import { LoaderCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

export default function CreateFolderForm({ accountId }: { accountId: string }) {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const path = usePathname()
	const id = path.split('/').pop()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		setIsLoading(true)

		try {
			await createFolder({ formData, accountId, id })
			setIsLoading(false)
			setError(null)
		} catch (error: any) {
			setIsLoading(false)
			setError(error.message)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='flex flex-col w-full gap-6 mb-6'>
			<div className='flex-col flex'>
				<label className='font-medium mb-1' htmlFor='folder'>
					New folder
				</label>
				<input
					type='text'
					name='folder'
					id='folder'
					placeholder='folder name'
					required
				/>

				{error && <div className='text-red-700 text-sm mb-2'>{error}</div>}

				<button
					type='submit'
					disabled={isLoading}
					className='h-11 flex justify-center items-center hover:bg-teal-600 transition-colors ease-linear duration-75 active:bg-teal-600 bg-primary-color w-full font-semibold text-white  py-2 rounded'
				>
					{isLoading ? (
						<LoaderCircle className='animate-spin text-lg' size={20} />
					) : (
						'Create'
					)}
				</button>
			</div>
		</form>
	)
}
