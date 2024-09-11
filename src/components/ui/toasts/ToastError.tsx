'use client'

import { OctagonAlert } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function ToastError({ error, message }: ToastErrorProps) {
	const toastRef = useRef<HTMLDivElement>(null)

	const handleCloseToast = () => {
		if (toastRef.current) {
			toastRef.current.className = 'hidden'
		}
	}

	useEffect(() => {
		if (toastRef.current) {
			toastRef.current.classList.remove('hidden')
		}
	}, [error])

	return (
		<div
			ref={toastRef}
			className='border-l-[6px] border-pink-error fixed right-3 top-[10%] animate-toastSlide bg-white z-10 py-3 px-4 flex gap-10 rounded-lg shadow-toast-shadow'
		>
			<div className='flex gap-3'>
				<OctagonAlert color='#F62B6F' />
				<div className=''>
					<div className='font-bold mb-1'>Error</div>
					<div>{message}</div>
				</div>
			</div>

			<button
				onClick={handleCloseToast}
				type='button'
				className='hover:underline text-sky-800'
			>
				Undo
			</button>
		</div>
	)
}
