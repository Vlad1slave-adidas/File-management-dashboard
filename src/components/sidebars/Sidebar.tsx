import { Navigation } from '@/constants'
import Logo from '../ui/logo/Logo'
import ButtonNav from '../ui/buttons/ButtonNav'
import Image from 'next/image'

export default function Sidebar() {
	return (
		<aside className='pl-6 pr-10 pt-10 pb-14 flex flex-col justify-between w-full h-full sticky left-0 top-0 '>
			<div className=''>
				<Logo isAbsolute={false} />
			</div>
			<div className='flex flex-col gap-4 '>
				{Navigation.map((item, index) => (
					<ButtonNav
						key={index}
						text={item.text}
						icon={item.icon}
						link={item.link}
					/>
				))}
			</div>
			<Image
				className='self-center'
				src={'/images/sidebar-image-3.png'}
				priority
				width={230}
				height={230}
				alt='sidebar-image'
			/>
		</aside>
	)
}
