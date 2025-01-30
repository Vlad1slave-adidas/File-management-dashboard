'use client'

import { uploadFile } from '@/lib/actions/file.actions'
import { Loader2, PlusCircle } from 'lucide-react'
import { useId, useState } from 'react'
import ToastError from '../toasts/ToastError'
import ToastSuccess from '../toasts/ToastSuccess'
import { usePathname } from 'next/navigation'

export default function ButtonAddFiles({
	ownerId,
	accountId,
}: ButtonAddFilesProps) {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const id = useId()

	const path = usePathname()

	const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setIsLoading(true)
		setIsSuccess(false)

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]

			try {
				const formData = new FormData()
				formData.append('file', file)

				await uploadFile({ formData, ownerId, accountId, path })

				setError(null)
				setIsLoading(false)
				setIsSuccess(true)
			} catch (error: any) {
				setError(error.message)
				setIsLoading(false)
				setIsSuccess(false)
			}
		}
	}

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault()
	// 	if (file) {
	// 		const formData = new FormData()
	// 		formData.append('file', file)
	// 		await uploadFile(formData)
	// 	}
	// }
	return (
		<>
			<form>
				<label
					htmlFor={id}
					className='cursor-pointer flex items-center gap-2 hover:bg-primary-color-hover transition-colors duration-75 ease-linear rounded-3xl font-medium text-sm bg-primary-color px-5 py-2 text-white '
				>
					<input
						type='file'
						id={id}
						className='hidden'
						onChange={handleChangeFile}
					/>
					<PlusCircle width={18} height={18} />
					{isLoading ? (
						<div className='flex items-center gap-2 justify-center'>
							<Loader2 className='animate-spin' width={18} />
							<span>Loading...</span>
						</div>
					) : (
						<span>Add file</span>
					)}
				</label>
			</form>

			{error !== null && <ToastError error={error} message={error} />}
			{isSuccess && <ToastSuccess isSuccess={isSuccess} message='File added' />}
		</>
	)
}
