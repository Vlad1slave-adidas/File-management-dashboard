import { Cloud } from 'lucide-react'

export default function ReverseLogo() {
	return (
		<div className='flex items-center gap-3 absolute left-7 top-7'>
			<div className='bg-white p-[10px] rounded-xl'>
				<Cloud color='#6A29FF' width={16} height={16} />
			</div>
			<span className='font-bold text-white'>JenxCloud</span>
		</div>
	)
}
