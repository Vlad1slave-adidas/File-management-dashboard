'use client'

import SignUpForm from '@/components/forms/SignUpForm'

export default function SignUpPage() {
	return (
		<div className='flex flex-col gap-7'>
			<div>
				<h1 className='mb-3'>Create Your Account</h1>
				<div className='additional-text'>
					Sign up to access exclusive features and start your journey today!
				</div>
			</div>

			<SignUpForm />
		</div>
	)
}
