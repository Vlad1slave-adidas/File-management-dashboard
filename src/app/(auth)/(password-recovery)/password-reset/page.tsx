import ForgetPasswordForm from '@/components/forms/ForgetPassword'
import { LockKeyhole } from 'lucide-react'

export default function PasswordResetPage() {
	return (
		<div className='flex flex-col gap-4 items-center '>
			<div className='text-center max-w-96 '>
				<div className='flex justify-center items-center mb-5'>
					<div className='bg-gray-100 p-3 rounded-xl'>
						<LockKeyhole
							className='text-primary-color'
							width={22}
							height={22}
						/>
					</div>
				</div>

				<h1 className='mb-3 text-3xl font-bold'>Reset your password</h1>
				<div className='additional-text text-base'>
					Forget your password? Please enter your email and we`ll send you a
					6-digit code or link to reset a password.
				</div>
			</div>

			<ForgetPasswordForm />
		</div>
	)
}
