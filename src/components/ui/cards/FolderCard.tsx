import Image from 'next/image'
import Link from 'next/link'
import ButtonOptions from '../buttons/ButtonOptions'

export default function FolderCard({ id, name }: { id: string; name: string }) {
	return (
		<Link
			className='p-4 relative hover:bg-primary-color bg-white hover:text-white rounded-xl shadow-sm group w-36'
			href={`/dashboard/${id}`}
		>
			<Image
				className='mb-1'
				src={'/assets/icons/folder.png'}
				alt='folder-image'
				width={50}
				height={50}
			/>
			<p className='font-semibold mb-1 truncate max-w-30'>{name}</p>
			<div className='w-full text-sm flex justify-between items-center text-gray-default group-hover:text-white'>
				<span>21 files</span>
				<span>13 KB</span>
			</div>

			<div className='absolute right-2 top-2 '>
				<ButtonOptions width='20' height='20' />
			</div>
		</Link>
	)
}
