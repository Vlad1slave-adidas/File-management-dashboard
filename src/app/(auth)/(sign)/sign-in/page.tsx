import SignInForm from '@/components/forms/SignInForm'

export default function SignInPage() {
	return (
		<div className='flex flex-col gap-7'>
			<div>
				<h1 className='mb-3'>Welcome back</h1>
				<div className='additional-text'>
					Welcome back! Please enter your details.
				</div>
			</div>

			<SignInForm />
		</div>
	)
}
