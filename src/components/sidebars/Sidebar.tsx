import { Navigation } from '@/constants'
import Logo from '../ui/logo/Logo'
import ButtonNav from '../ui/buttons/ButtonNav'

export default function Sidebar() {
	return (
		<aside className='pl-6 pr-10 pt-10 w-full sticky left-0 top-0'>
			<div className='mb-28'>
				<Logo isAbsolute={false} />
			</div>
			<div className='flex flex-col gap-4'>
				{Navigation.map((item, index) => (
					<ButtonNav
						key={index}
						text={item.text}
						icon={item.icon}
						link={item.link}
					/>
				))}
			</div>
		</aside>
	)
}
