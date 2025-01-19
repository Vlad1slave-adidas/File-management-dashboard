'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/messages/ErrorMessage'
import { getDigitCode } from '@/lib/actions/auth.actions'
import { useState } from 'react'
import ToastError from '../ui/toasts/ToastError'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import ToastSuccess from '../ui/toasts/ToastSuccess'
import useUser from '@/hooks/useUser'

export default function ForgetPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgetPasswordFormData>({
		mode: 'onChange',
	})

	const { setUserId, setEmail } = useUser()

	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const router = useRouter()

	const onSubmit: SubmitHandler<ForgetPasswordFormData> = async data => {
		setIsSuccess(false)

		setIsLoading(true)
		setError(null)

		try {
			const userId = await getDigitCode(data)

			setEmail(data.email)
			setUserId(userId)
			setIsLoading(false)

			router.push('/confirm-password')
		} catch (error: any) {
			setIsLoading(false)
			setError(error.message)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 w-96'
		>
			<div className='flex flex-col gap-2 mb-2'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					className={`input-default ${errors.email && 'error-field -mb-1'}`}
					placeholder='Enter your email'
					{...register('email', { required: true })}
				/>
				{errors.email && <ErrorMessage text='Email is invalid' />}
			</div>

			<div className='flex flex-col gap-4'>
				<button disabled={isLoading} className='button-submit' type='submit'>
					{isLoading ? (
						<div className='flex items-center gap-2 justify-center'>
							<Loader2 className='animate-spin' width={18} />
							<span>Loading...</span>
						</div>
					) : (
						'Get a 6-digit code'
					)}
				</button>
			</div>

			{error !== null && <ToastError error={error} message={error} />}

			{isSuccess && (
				<ToastSuccess
					isSuccess={isSuccess}
					message='We send reset link to email'
				/>
			)}
		</form>
	)
}
