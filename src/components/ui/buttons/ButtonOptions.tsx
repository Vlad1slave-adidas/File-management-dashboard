import { MoreHorizontal } from 'lucide-react'

export default function ButtonOptions({
	width,
	height,
}: {
	width?: string
	height?: string
}) {
	return (
		<button className='hover:text-primary-color transition-colors duration-75 ease-linear hover:bg-primary-color/5 rounded-lg p-1'>
			<MoreHorizontal width={width} height={height} />
		</button>
	)
}
