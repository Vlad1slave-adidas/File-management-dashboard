'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/messages/ErrorMessage'
import Link from 'next/link'
import ButtonGoogle from '../ui/buttons/ButtonGoogle'
import useToggleShowPassword from '@/hooks/useToggleShowPassword'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { signUpWithEmail } from '@/lib/actions/auth.actions'
import { useState } from 'react'
import ToastError from '../ui/toasts/ToastError'
import ToastSuccess from '../ui/toasts/ToastSuccess'
import ButtonSubmit from '../ui/buttons/ButtonSubmit'

export default function SignUpForm() {
	const { handleToggleShowPassword, showPassword } = useToggleShowPassword()
	const [errorToast, setErrorToast] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpFormData>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<SignUpFormData> = async data => {
		setIsLoading(true)
		setIsSuccess(false)
		setErrorToast(null)

		try {
			await signUpWithEmail(data)
			setIsLoading(false)
			setIsSuccess(true)
		} catch (error: any) {
			setIsLoading(false)
			setErrorToast(error.message)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 w-96'
		>
			<div className='flex flex-col gap-2'>
				<label htmlFor='name'>Name</label>
				<input
					className={`input-default ${errors.name && 'error-field -mb-1'}`}
					placeholder='Your name'
					{...register('name', {
						required: 'Name is invalid',
						minLength: {
							value: 4,
							message: 'The name must be more than 3 characters',
						},
						maxLength: {
							value: 30,
							message: 'The name must be less than 30 characters',
						},
					})}
				/>
				{errors?.name && (
					<ErrorMessage text={errors?.name?.message as string} />
				)}
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor='email'>Email</label>
				<input
					className={`input-default ${errors.email && 'error-field -mb-1'}`}
					placeholder='Enter your email'
					{...register('email', { required: true })}
				/>
				{errors.email && <ErrorMessage text='Email is invalid' />}
			</div>

			<div className='flex flex-col gap-2 mb-2'>
				<label htmlFor='password'>Password</label>
				<div className='w-full relative'>
					<input
						className={`input-default w-full pr-10 ${
							errors.password && 'error-field'
						}`}
						placeholder='••••••••'
						type={showPassword ? 'text' : 'password'}
						{...register('password', {
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

				{errors?.password && (
					<ErrorMessage text={errors?.password?.message as string} />
				)}
			</div>

			<div className='flex flex-col gap-2'>
				<ButtonSubmit isLoading={isLoading} text='Sign up' />

				<ButtonGoogle />
			</div>

			<div className='flex justify-center'>
				<span className='additional-text mr-1'>Do you have account?</span>
				<Link
					href={'/sign-in'}
					className='text-sm  text-primary-color hover:underline'
				>
					Sign in
				</Link>
			</div>

			{errorToast !== null && (
				<ToastError error={errorToast} message={errorToast} />
			)}
			{isSuccess && (
				<ToastSuccess
					isSuccess={isSuccess}
					message='Account created successfully'
				/>
			)}
		</form>
	)
}
