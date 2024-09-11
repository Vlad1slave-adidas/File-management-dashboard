import ConfirmPasswordForm from '@/components/forms/ConfirmPasswordForm'
import { RectangleEllipsis } from 'lucide-react'

export default function ConfirmPasswordPage() {
	return (
		<div className='flex flex-col gap-4 items-center '>
			<div className='text-center mb-5'>
				<div className='flex justify-center items-center mb-5'>
					<div className='bg-gray-100 p-3 rounded-xl'>
						<RectangleEllipsis
							className='text-primary-color'
							width={22}
							height={22}
						/>
					</div>
				</div>

				<h1 className='mb-3 text-3xl font-bold'>Enter confirmation code</h1>
				<div className='additional-text text-base'>
					We sent a code to <b>email</b>
				</div>
			</div>

			<ConfirmPasswordForm />
		</div>
	)
}
