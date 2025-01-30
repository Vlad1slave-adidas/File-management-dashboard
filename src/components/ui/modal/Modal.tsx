import { X } from 'lucide-react'

export default function Modal({ isOpen, content, handler }: ModalProps) {
	if (!isOpen) return null

	return (
		<div className='flex justify-center items-center absolute top-0 left-0 z-50 w-full h-screen bg-black/20'>
			<div className='bg-white p-4 rounded-lg'>
				<div className='w-full flex justify-end'>
					<button
						className='text-gray-400 hover:text-black duration-75 ease-linear mb-2'
						onClick={handler}
					>
						<X />
					</button>
				</div>

				<div>{content}</div>
			</div>
		</div>
	)
}
