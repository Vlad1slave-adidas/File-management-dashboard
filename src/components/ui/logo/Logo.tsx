import { Cloud } from 'lucide-react'
import React from 'react'

export default function Logo() {
	return (
		<div className='flex items-center gap-3 absolute left-7 top-7'>
			<div className='bg-primary-color p-[10px] rounded-xl'>
				<Cloud color='white' width={16} height={16} />
			</div>
			<span className='font-bold'>JenxCloud</span>
		</div>
	)
}
