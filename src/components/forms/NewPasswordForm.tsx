'use client'

import useToggleShowPassword from '@/hooks/useToggleShowPassword'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/messages/ErrorMessage'
import { Eye, EyeOff } from 'lucide-react'
import ButtonSubmit from '../ui/buttons/ButtonSubmit'
import { updateRecovery } from '@/lib/actions/user.actions'
import { useRouter, useSearchParams } from 'next/navigation'
import ToastError from '../ui/toasts/ToastError'

export default function NewPasswordForm() {
	const { handleToggleShowPassword, showPassword } = useToggleShowPassword()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewPasswordFormData>({
		mode: 'onChange',
	})

	const searchParams = useSearchParams()

	const router = useRouter()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const onSubmit: SubmitHandler<NewPasswordFormData> = async data => {
		setIsLoading(true)

		try {
			const userId = searchParams.get('userId')

			const secret = searchParams.get('secret')

			const newPassword = data.newPassword
			const confirmPassword = data.confirmPassword

			if (newPassword !== confirmPassword) {
				setError('Passwords must match')
				setIsLoading(false)
			} else {
				if (userId && secret) {
					await updateRecovery({
						userId: userId,
						secret: secret,
						password: newPassword,
					})

					setIsLoading(false)
					setError(null)

					router.push('/password-success-reset')
				} else {
					setError('UserId and secret not found')
					setIsLoading(false)
				}
			}
		} catch (error: any) {
			setError(error.message)
			setIsLoading(false)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 w-96'
		>
			<div className='flex flex-col gap-2'>
				<div className='w-full relative'>
					<input
						className={`input-default w-full pr-10 ${
							errors.newPassword && 'error-field'
						}`}
						placeholder='Set new password'
						type={showPassword ? 'text' : 'password'}
						{...register('newPassword', {
							required: 'Password is invalid',
							minLength: {
								value: 8,
								message: 'The password must be more than 8 characters',
							},
							maxLength: {
								value: 30,
								message: 'The password must be less than 8 characters',
							},
						})}
					/>
					<button
						type='button'
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
						onClick={handleToggleShowPassword}
					>
						{showPassword ? <Eye width={22} /> : <EyeOff width={22} />}
					</button>
				</div>

				{errors?.newPassword && (
					<ErrorMessage text={errors?.newPassword?.message as string} />
				)}
			</div>

			<div className='flex flex-col gap-2 mb-1'>
				<div className='w-full relative'>
					<input
						className={`input-default w-full pr-10 ${
							errors.confirmPassword && 'error-field'
						}`}
						placeholder='Confirm new password'
						type={showPassword ? 'text' : 'password'}
						{...register('confirmPassword', {
							required: 'Password is invalid',
							minLength: {
								value: 8,
								message: 'The password must be more than 8 characters',
							},
							maxLength: {
								value: 30,
								message: 'The password must be less than 8 characters',
							},
						})}
					/>
					<button
						type='button'
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
						onClick={handleToggleShowPassword}
					>
						{showPassword ? <Eye width={22} /> : <EyeOff width={22} />}
					</button>
				</div>

				{errors?.confirmPassword && (
					<ErrorMessage text={errors?.confirmPassword?.message as string} />
				)}
			</div>

			{error !== null && <ToastError error={error} message={error} />}

			<ButtonSubmit isLoading={isLoading} text='Reset password' />
		</form>
	)
}
