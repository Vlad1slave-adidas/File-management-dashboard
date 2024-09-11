import { Loader2 } from 'lucide-react'

export default function ButtonSubmit({ isLoading, text }: ButtonSubmitProps) {
	return (
		<button disabled={isLoading} className='button-submit mb-2' type='submit'>
			{isLoading ? (
				<div className='flex items-center gap-2 justify-center'>
					<Loader2 className='animate-spin' width={18} />
					<span>Loading...</span>
				</div>
			) : (
				text
			)}
		</button>
	)
}
