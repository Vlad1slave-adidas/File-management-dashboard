'use client'

import Image from 'next/image'
import { useState } from 'react'
import Dropdown from '../dropdown/Dropdown'

export default function Profile({ avatar }: { avatar: string }) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='relative'>
			<button
				onClick={handleOpen}
				className='border-gray-400 transition-colors duration-75 ease-linear hover:border-primary-color border-2 p-[1px] rounded-full'
			>
				<Image
					src={avatar}
					height={30}
					width={30}
					className='rounded-full  '
					alt='avatar'
				></Image>
			</button>

			{isOpen && <Dropdown />}
		</div>
	)
}
