'use client'

import clsx from 'clsx'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ButtonAuthNav({
	link,
	text,
	additionalText,
}: ButtonAuthNavProps) {
	const pathname = usePathname()

	return (
		<Link
			className={clsx(
				'text-gray-400 hover:text-white transition-colors duration-75 ease-linear flex gap-2',
				{
					'text-white': pathname === link,
				}
			)}
			href={link}
		>
			<CheckCircle2 width={20} />
			<div>
				<div className='mb-1'>{text}</div>
				<div className='text-sm'>{additionalText}</div>
			</div>
		</Link>
	)
}
