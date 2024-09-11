import NewPasswordForm from '@/components/forms/NewPasswordForm'
import { RectangleEllipsis } from 'lucide-react'

export default function NewPasswordPage() {
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

				<h1 className='mb-3 text-3xl font-bold'>Create a new password</h1>
				<div className='additional-text text-base max-w-96'>
					Please choose a password that hasn`t been used before. Must be at
					least 8 characters.
				</div>
			</div>

			<NewPasswordForm />
		</div>
	)
}
