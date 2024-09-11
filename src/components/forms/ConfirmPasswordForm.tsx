'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import useUser from '@/hooks/useUser'
import { confirmPassword } from '@/lib/actions/auth.actions'
import { useState } from 'react'
import ToastError from '../ui/toasts/ToastError'

export default function ConfirmPasswordForm() {
	const { register, handleSubmit } = useForm<ConfirmPasswordFormData>({
		mode: 'onChange',
	})

	const { userId } = useUser()
	const [error, setError] = useState(null)

	const onSubmit: SubmitHandler<ConfirmPasswordFormData> = async data => {
		setError(null)

		try {
			const result = await confirmPassword(data, userId as string)
			console.log(result)
		} catch (error: any) {
			setError(error.message)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 w-96 items-center'
		>
			<div className='flex gap-4 text-4xl font-bold mb-2'>
				<input
					className='[&:not(:placeholder-shown)]:outline-primary-color text-center outline w-16 h-16 outline-gray-300 focus:outline-[3px] focus:outline-primary-color rounded-lg'
					placeholder=''
					maxLength={1}
					{...register('otp1', { required: true })}
				></input>
				<input
					className='text-center outline w-16 h-16 [&:not(:placeholder-shown)]:outline-primary-color outline-gray-300 focus:outline-[3px] focus:outline-primary-color rounded-lg'
					maxLength={1}
					placeholder=''
					{...register('otp2', { required: true })}
				></input>
				<input
					className='[&:not(:placeholder-shown)]:outline-primary-color text-center outline w-16 h-16 outline-gray-300 focus:outline-[3px] focus:outline-primary-color rounded-lg'
					maxLength={1}
					placeholder=''
					{...register('otp3', { required: true })}
				></input>
				<input
					className='[&:not(:placeholder-shown)]:outline-primary-color text-center outline w-16 h-16 outline-gray-300 focus:outline-[3px] focus:outline-primary-color rounded-lg'
					maxLength={1}
					placeholder=''
					{...register('otp4', { required: true })}
				></input>
				<input
					className='[&:not(:placeholder-shown)]:outline-primary-color text-center outline w-16 h-16 outline-gray-300 focus:outline-[3px] focus:outline-primary-color rounded-lg'
					maxLength={1}
					placeholder=''
					{...register('otp5', { required: true })}
				></input>
				<input
					className='[&:not(:placeholder-shown)]:outline-primary-color text-center outline w-16 h-16 outline-gray-300 focus:outline-[3px] focus:outline-primary-color rounded-lg'
					maxLength={1}
					placeholder=''
					{...register('otp6', { required: true })}
				></input>
			</div>

			<button className='w-full button-submit mb-2' type='submit'>
				Continue
			</button>

			<div className='flex additional-text gap-1 justify-center'>
				<span>Didn`t receive the email?</span>
				<Link
					className='text-primary-color hover:underline font-bold'
					href={'/password-reset'}
				>
					Click to resend
				</Link>
			</div>

			{error !== null && <ToastError error={error} message={error} />}
		</form>
	)
}
