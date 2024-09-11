'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/messages/ErrorMessage'
import { getDigitCode } from '@/lib/actions/auth.actions'
import useUser from '@/hooks/useUser'
import ButtonSubmit from '../ui/buttons/ButtonSubmit'
import { useState } from 'react'
import ToastError from '../ui/toasts/ToastError'
import { useRouter } from 'next/navigation'

export default function ForgetPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgetPasswordFormData>({
		mode: 'onChange',
	})

	const { setUserId } = useUser()

	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const router = useRouter()

	const onSubmit: SubmitHandler<ForgetPasswordFormData> = async data => {
		setIsLoading(true)
		setError(null)

		try {
			const userId = await getDigitCode(data)

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
			<div className='flex flex-col gap-2'>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					className={`input-default ${errors.email && 'error-field -mb-1'}`}
					placeholder='Enter your email'
					{...register('email', { required: true })}
				/>
				{errors.email && <ErrorMessage text='Email is invalid' />}
			</div>

			{/* <button className='button-submit mb-2' type='submit'>
				Get a 4-digit code
			</button> */}
			<ButtonSubmit isLoading={isLoading} text='Get a 4-digit code' />

			{error !== null && <ToastError error={error} message={error} />}
		</form>
	)
}
