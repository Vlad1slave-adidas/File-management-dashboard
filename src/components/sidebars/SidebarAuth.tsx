import { AuthNavigation } from '@/constants'
import ButtonAuthNav from '../ui/buttons/ButtonAuthNav'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SidebarAuth() {
	return (
		<div>
			<div className='flex flex-col gap-7'>
				{AuthNavigation.map((item, index) => (
					<ButtonAuthNav
						key={index}
						link={item.link}
						text={item.text}
						additionalText={item.additionalText}
					/>
				))}
			</div>

			<Link
				className='absolute bottom-10 text-sm font-semibold hover:underline text-white flex items-center gap-2'
				href={'/sign-in'}
			>
				<ArrowLeft />
				<span>Back to login</span>
			</Link>
		</div>
	)
}
