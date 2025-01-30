import { constructFileUrl } from '@/lib/utils/getUrl'
import Image from 'next/image'

export default function Profile({ avatar }: { avatar: string }) {
	const avatarURL = constructFileUrl(avatar)

	return (
		<button className='border-gray-400 transition-colors duration-75 ease-linear hover:border-primary-color border-2 p-[1px] rounded-full'>
			<Image
				src={avatar}
				height={30}
				width={30}
				className='rounded-full  '
				alt='avatar'
			></Image>
		</button>
	)
}
