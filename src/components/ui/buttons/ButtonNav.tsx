'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ButtonNav({ text, icon, link }: ButtonNavProps) {
	const pathname = usePathname()

	return (
		<Link
			className={clsx(
				'px-5 py-3 text-sm hover:bg-white-navigation text-gray-400 hover:font-medium hover:text-primary-color transition-colors duration-75 ease-linear flex gap-2',
				{
					'text-primary-color font-medium bg-white-navigation  rounded-xl':
						pathname === link,
				}
			)}
			href={link}
		>
			{icon}
			<span>{text}</span>
		</Link>
	)
}
