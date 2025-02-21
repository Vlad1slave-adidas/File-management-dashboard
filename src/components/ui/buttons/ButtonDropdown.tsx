import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

export default function ButtonDropdown({
	isOpen,
	setIsOpen,
	width,
	height,
}: ButtonDropdownProps) {
	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
		<button
			onClick={handleOpen}
			className='text-gray-default hover:text-primary-color transition-colors duration-75 ease-linear'
		>
			<div className='hover:bg-primary-color/5 rounded-lg p-1'>
				{isOpen ? (
					<ChevronDown width={width} height={height} />
				) : (
					<ChevronUp width={width} height={height} />
				)}
			</div>
		</button>
	)
}
