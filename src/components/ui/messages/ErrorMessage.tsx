import { OctagonAlert } from 'lucide-react'

export default function ErrorMessage({ text }: { text: string }) {
	return (
		<div className='flex gap-1 items-center'>
			<OctagonAlert color='#F62B6F' width={16} />
			<span className='text-pink-error text-sm'>{text}</span>
		</div>
	)
}
