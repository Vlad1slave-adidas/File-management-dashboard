'use server'
import {
	Client,
	Account,
	Databases,
	Storage,
	Avatars,
	Query,
} from 'node-appwrite'
import { cookies } from 'next/headers'
import { appwriteConfig } from './config'

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(appwriteConfig.endpointUrl)
		.setProject(appwriteConfig.projectId)

	const session = cookies().get('my-custom-session')
	if (!session || !session.value) {
		throw new Error('No session')
	}

	client.setSession(session.value)

	return {
		get account() {
			return new Account(client)
		},
		get databases() {
			return new Databases(client)
		},
		get storage() {
			return new Storage(client)
		},
		get avatars() {
			return new Avatars(client)
		},
	}
}

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(appwriteConfig.endpointUrl)
		.setProject(appwriteConfig.projectId)
		.setKey(appwriteConfig.secretKey)

	return {
		get account() {
			return new Account(client)
		},
		get databases() {
			return new Databases(client)
		},
		get storage() {
			return new Storage(client)
		},
		get avatars() {
			return new Avatars(client)
		},
	}
}

export const parseStringify = (value: unknown) =>
	JSON.parse(JSON.stringify(value))

export const getLoggedInUser = async () => {
	try {
		const { databases, account } = await createSessionClient()

		const result = await account.get()

		const user = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			[Query.equal('accountId', result.$id)]
		)

		if (user.total <= 0) return null

		return user.documents[0]
	} catch (error) {
		console.log(error)
	}
}
