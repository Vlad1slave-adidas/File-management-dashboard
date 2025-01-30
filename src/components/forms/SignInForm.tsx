'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/messages/ErrorMessage'
import Link from 'next/link'
import ButtonGoogle from '../ui/buttons/ButtonGoogle'
import useToggleShowPassword from '@/hooks/useToggleShowPassword'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { signInWithEmail } from '@/lib/actions/user.actions'
import ToastError from '../ui/toasts/ToastError'
import ToastSuccess from '../ui/toasts/ToastSuccess'
import ButtonSubmit from '../ui/buttons/ButtonSubmit'

export default function SignInForm() {
	const { handleToggleShowPassword, showPassword } = useToggleShowPassword()
	const [errorToast, setErrorToast] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<SignInFormData> = async data => {
		setIsLoading(true)
		setErrorToast(null)

		try {
			await signInWithEmail(data)
			setIsLoading(false)
			console.log('Запрос идет')
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
				<label htmlFor='email'>Email</label>
				<input
					className={`input-default ${errors.email && 'error-field'}`}
					placeholder='Enter your email'
					type='email'
					{...register('email', { required: true })}
				/>
				{errors.email && <ErrorMessage text='Email is invalid' />}
			</div>

			<div className='flex flex-col gap-2'>
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

			<div className='text-sm font-medium flex justify-between'>
				<div className='flex items-center'>
					<input className='mr-1' type='checkbox'></input>
					<span>Keep me logged in</span>
				</div>

				<Link
					href={'/password-reset'}
					className='text-primary-color hover:underline'
				>
					Forget password
				</Link>
			</div>

			<div className='flex flex-col gap-3'>
				<ButtonSubmit isLoading={isLoading} text='Sign in' />

				<ButtonGoogle />
			</div>

			<div className='flex justify-center'>
				<span className='additional-text mr-1'>Do you have account?</span>
				<Link
					href={'/sign-up'}
					className='text-sm mb- text-primary-color hover:underline'
				>
					Sign up
				</Link>
			</div>

			{errorToast !== null && (
				<ToastError error={errorToast} message={errorToast} />
			)}
		</form>
	)
}
