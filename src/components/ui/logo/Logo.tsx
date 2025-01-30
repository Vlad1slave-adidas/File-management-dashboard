import { Cloud } from 'lucide-react'
import React from 'react'

export default function Logo({ isAbsolute }: { isAbsolute?: boolean }) {
	return (
		<div
			className={
				isAbsolute
					? `flex items-center gap-3 absolute left-7 top-7`
					: `flex items-center gap-3`
			}
		>
			<div className='bg-primary-color p-[10px] rounded-xl'>
				<Cloud
					color='white'
					width={isAbsolute ? 16 : 18}
					height={isAbsolute ? 16 : 18}
				/>
			</div>
			<span className={`font-bold ${isAbsolute ? 'text-base' : 'text-lg'}`}>
				JenxCloud
			</span>
		</div>
	)
}
