'use server'

import { cookies } from 'next/headers'
import { createAdminClient, createSessionClient } from '../server/appwrite'
import { redirect } from 'next/navigation'
import { ID } from 'node-appwrite'
import { appwriteConfig } from '../server/config'

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

		const { account, databases, storage } = await createAdminClient()

		const newAccount = await account.create(ID.unique(), email, password, name)

		const session = await account.createEmailPasswordSession(email, password)

		cookies().set('my-custom-session', session.secret, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		})

		const { avatars } = await createSessionClient()

		const avatarInitial = await avatars.getInitials(name)

		// Преобразуем ArrayBuffer в Blob
		const blob = new Blob([avatarInitial], { type: 'image/png' })

		// Преобразуем Blob в File (если требуется, например, имя файла)
		const file = new File([blob], `${ID.unique()}.png`, { type: 'image/png' })

		const fileResponse = await storage.createFile(
			appwriteConfig.bucketId,
			ID.unique(),
			file
		)

		await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			{
				name: newAccount.name,
				email: newAccount.email,
				accountId: newAccount.$id,
				avatar: fileResponse.$id,
			}
		)
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
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export async function createPasswordRecovery(email: string) {
	try {
		const { account } = await createSessionClient()

		const result = await account.createRecovery(
			email,
			'http://localhost:3000/new-password'
		)

		return result
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export async function updateRecovery(data: UpdateRecoveryParams) {
	try {
		const { account } = await createSessionClient()

		const userId = data.userId
		const secret = data.secret
		const password = data.password

		const result = await account.updateRecovery(userId, secret, password)

		return result
	} catch (error: any) {
		throw new Error(error.message)
	}
}
