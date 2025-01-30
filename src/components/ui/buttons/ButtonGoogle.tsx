import { signUpWithGoogle } from '@/lib/server/oauth'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ButtonGoogle() {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleClick = async () => {
		setIsLoading(true)

		try {
			await signUpWithGoogle()
			setIsLoading(false)
		} catch (error: any) {
			console.log(error.message)
			setIsLoading(false)
		}
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			className='hover:bg-gray-200 transition-colors duration-75 ease-linear relative border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2'
		>
			{isLoading ? (
				<div className='flex items-center gap-2 justify-center'>
					<Loader2 className='animate-spin' width={18} />
					<span>Loading...</span>
				</div>
			) : (
				<div>
					<Image
						className='absolute left-20'
						src={'assets/icons/google.svg'}
						alt='google'
						width={28}
						height={28}
					/>
					<span>Sign in with Google</span>
				</div>
			)}
		</button>
	)
}
