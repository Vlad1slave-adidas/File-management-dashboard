'use client'

import useToggleShowPassword from '@/hooks/useToggleShowPassword'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/messages/ErrorMessage'
import { Eye, EyeOff } from 'lucide-react'
import { updatePassword } from '@/lib/actions/auth.actions'
import ButtonSubmit from '../ui/buttons/ButtonSubmit'

export default function NewPasswordForm() {
	const { handleToggleShowPassword, showPassword } = useToggleShowPassword()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewPasswordFormData>({
		mode: 'onChange',
	})

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const onSubmit: SubmitHandler<NewPasswordFormData> = async data => {
		setIsLoading(true)

		try {
			const result = await updatePassword(
				data.newPassword,
				data.confirmPassword
			)
			setIsLoading(false)
			console.log('result', result)
		} catch (error: any) {
			console.log(error.message)
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

			<ButtonSubmit isLoading={isLoading} text='Reset password' />
		</form>
	)
}
