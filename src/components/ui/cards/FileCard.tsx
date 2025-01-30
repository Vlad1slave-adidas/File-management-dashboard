import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ButtonOptions from '../buttons/ButtonOptions'

export default function FileCard({
	name,
	icon,
	url,
	member,
	lastModified,
}: FileCardProps) {
	return (
		<Link
			href={url}
			target='_blank'
			className='text-sm w-full grid grid-cols-[9fr_4fr_5fr_1fr] items-center text-gray-default hover:bg-white rounded-xl py-3'
		>
			<div className='pl-2 flex items-center gap-4'>
				<Image src={icon} width={28} height={28} alt='file-icon' />
				<span className='font-semibold text-black-default truncate max-w-64'>
					{name}
				</span>
			</div>
			<span>{member}</span>
			<time dateTime={lastModified}>{lastModified}</time>
			<ButtonOptions />
		</Link>
	)
}
