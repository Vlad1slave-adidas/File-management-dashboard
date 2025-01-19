'use server'

import { createAdminClient } from '@/lib/server/appwrite'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { OAuthProvider } from 'node-appwrite'

export async function signUpWithGoogle() {
	try {
		const { account } = await createAdminClient()

		const origin = headers().get('origin')

		const redirectUrl = await account.createOAuth2Token(
			OAuthProvider.Google,
			`${origin}/oauth`,
			`${origin}/sign-up`
		)

		return redirect(redirectUrl)
	} catch (error: any) {
		throw new Error(error.message)
	}
}
