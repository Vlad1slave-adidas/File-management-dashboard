import { createAdminClient } from '@/lib/server/appwrite'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get('userId') as string
	const secret = request.nextUrl.searchParams.get('secret') as string

	const { account } = await createAdminClient()
	const session = await account.createSession(userId, secret)

	cookies().set('my-custom-session', session.secret, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: true,
	})

	return NextResponse.redirect(`${request.nextUrl.origin}/dashboard`)
}
