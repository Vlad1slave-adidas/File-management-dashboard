import { PlusCircle } from 'lucide-react'

export default function ButtonAddFiles() {
	return (
		<button className=' hover:bg-primary-color-hover transition-colors duration-75 ease-linear rounded-3xl font-medium text-sm bg-primary-color px-5 py-2 text-white flex items-center gap-2'>
			<PlusCircle width={18} height={18} />
			<span>Add files</span>
		</button>
	)
}
