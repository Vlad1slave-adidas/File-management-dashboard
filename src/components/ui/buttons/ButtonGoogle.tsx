import Image from 'next/image'

export default function ButtonGoogle() {
	return (
		<button className='hover:bg-gray-200 transition-colors duration-75 ease-linear relative border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2'>
			<Image
				className='absolute left-20'
				src={'/icons/google.svg'}
				alt='google'
				width={28}
				height={28}
			/>
			<span>Sign in with Google</span>
		</button>
	)
}
