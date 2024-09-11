'use server'

import { cookies } from 'next/headers'
import { createAdminClient, createSessionClient } from '../server/appwrite'
import { redirect } from 'next/navigation'
import { Client, ID } from 'node-appwrite'

export async function signInWithEmail(data: SignInParams) {
	let success = false

	try {
		const password = data.password
		const email = data.email

		const { account } = await createAdminClient()
		const session = await account.createEmailPasswordSession(email, password)

		cookies().set('my-custom-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		})

		success = true
	} catch (error: any) {
		throw new Error(error.message)
	} finally {
		if (success) {
			redirect('/dashboard')
		}
	}
}

export async function signUpWithEmail(data: SignUpParams) {
	try {
		const email = data.email
		const password = data.password
		const name = data.name

		const { account } = await createAdminClient()

		await account.create(ID.unique(), email, password, name)
		const session = await account.createEmailPasswordSession(email, password)

		cookies().set('my-custom-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		})
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export async function signOut() {
	const { account } = await createSessionClient()

	cookies().delete('my-custom-session')
	await account.deleteSession('current')

	redirect('/sign-in')
}

export async function getDigitCode(data: ForgetPasswordFormData) {
	try {
		const { account } = await createAdminClient()

		const email = data.email

		const sessionToken = await account.createEmailToken(
			ID.unique(),
			email,
			false
		)

		const userId = sessionToken.userId

		return userId
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export async function confirmPassword(
	data: ConfirmPasswordFormData,
	userId: string
) {
	let success = false

	try {
		const { account } = await createAdminClient()

		const array = [
			data.otp1,
			data.otp2,
			data.otp3,
			data.otp4,
			data.otp5,
			data.otp6,
		]

		const secret = array.join('')

		const session = await account.createSession(userId, secret)

		cookies().set('my-custom-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		})

		success = true
	} catch (error: any) {
		throw new Error(error.message)
	} finally {
		if (success) {
			redirect('/new-password')
		}
	}
}

export async function updatePassword(newPassword: string, oldPassword: string) {
	let success = false

	try {
		const { account } = await createSessionClient()

		const session = await account.get()

		console.log('Информация о сессии:', session)

		if (session) {
			console.log('Новый пароль:', newPassword)
			await account.updatePassword(newPassword, oldPassword)
			success = true
		} else {
			throw new Error('User is not authenticated')
		}
	} catch (error: any) {
		throw new Error(error.message)
	} finally {
		if (success) {
			redirect('/password-success-reset')
		}
	}
}
