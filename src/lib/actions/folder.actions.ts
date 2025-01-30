import { ID, Query } from 'node-appwrite'
import {
	createAdminClient,
	createSessionClient,
	getLoggedInUser,
} from '../server/appwrite'
import { appwriteConfig } from '../server/config'
import { revalidatePath } from 'next/cache'

export const createFolder = async ({
	formData,
	accountId,
	path,
}: CreateFolderParams) => {
	const { databases } = await createAdminClient()

	try {
		const folder = formData.get('folder')

		if (!folder) {
			throw new Error('Folder not found in FormData')
		}

		const folderDocument = {
			name: folder,
			accountId,
			parentFolderId: path,
			files: [],
		}

		const newFolder = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.foldersCollectionId,
			ID.unique(),
			folderDocument
		)

		revalidatePath(path)
		return newFolder
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const getFolders = async () => {
	const { databases } = await createSessionClient()

	try {
		const currentUser = await getLoggedInUser()

		if (!currentUser) throw new Error('User not found')

		const queries = [Query.equal('accountId', [currentUser.accountId])]

		const folders = await databases.listDocuments(
			appwriteConfig.databaseId, // databaseId
			appwriteConfig.foldersCollectionId, // collectionId
			queries // queries (optional)
		)

		console.log(folders)
		return folders
	} catch (error: any) {
		throw new Error(error.message)
	}
}
