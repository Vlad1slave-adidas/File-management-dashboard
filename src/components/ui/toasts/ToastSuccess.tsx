'use client'

import { CheckCircle2 } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function ToastSuccess({
	isSuccess,
	message,
}: ToastSuccessProps) {
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
	}, [isSuccess])

	return (
		<div
			ref={toastRef}
			className='border-l-[6px] border-green-success fixed right-3 top-[10%] animate-toastSlide bg-white z-10 py-3 px-4 flex gap-10 rounded-lg shadow-toast-shadow'
		>
			<div className='flex gap-3'>
				<CheckCircle2 color='#3EC43B' />
				<div className=''>
					<div className='font-bold mb-1'>Success</div>
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
