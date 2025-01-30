import { Search } from 'lucide-react'

export default function SearchField() {
	return (
		<div className='flex items-center gap-3'>
			<Search className='text-gray-default' width={18} height={18} />
			<input
				className=' bg-transparent text-sm'
				placeholder='Search file...'
			></input>
		</div>
	)
}
