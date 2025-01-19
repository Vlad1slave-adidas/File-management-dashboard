import Logo from '@/components/ui/logo/Logo'
import Image from 'next/image'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex'>
			<div className='relative w-1/2 h-screen flex justify-center items-center'>
				<div>{children}</div>
				<Logo isAbsolute={true} />
			</div>
			<div className='relative w-1/2 h-screen'>
				<Image
					src={'/images/main.jpg'}
					alt='main'
					fill
					style={{ objectFit: 'cover' }}
					priority
				/>
			</div>
		</div>
	)
}
