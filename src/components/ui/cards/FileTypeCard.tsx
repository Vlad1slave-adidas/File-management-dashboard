import React from 'react'

export default function FileTypeCard({
	image,
	text,
	fileCount,
	totalSize,
}: FileTypeCardProps) {
	return (
		<div className='flex items-center gap-3 w-full px-3 py-2 border-[0.3px] shadow-sm border-gray-100 rounded-xl'>
			<div className='text-second-primary'>{image}</div>
			<div className='flex justify-between items-center w-full'>
				<div className='text-sm'>
					<p className='font-semibold'>{text}</p>
					<p className='text-gray-default'>{fileCount} Total files</p>
				</div>
				<div className='text-gray-default text-sm'>{totalSize}</div>
			</div>
		</div>
	)
}
