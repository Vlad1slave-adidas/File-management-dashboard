'use server'

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
	id,
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
			parentFolderId: id,
			files: [],
		}

		const newFolder = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.foldersCollectionId,
			ID.unique(),
			folderDocument
		)

		if (id) revalidatePath(`/dashboard${id}`)

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

		return folders
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const getFolderHierarchy = async (
	parentFolderId?: string
): Promise<Folder[]> => {
	const { databases } = await createSessionClient()
	const currentUser = await getLoggedInUser()

	if (!currentUser) throw new Error('User not found')

	const queries = [Query.equal('accountId', [currentUser.accountId])]

	// Добавляем фильтр только если parentFolderId передан
	if (parentFolderId) {
		queries.push(Query.equal('parentFolderId', [parentFolderId]))
	}

	const folders = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.foldersCollectionId,
		queries
	)

	// Рекурсивно загружаем вложенные папки
	const foldersWithChildren: Folder[] = await Promise.all(
		folders.documents.map(
			async (folder): Promise<Folder> => ({
				$id: folder.$id,
				name: folder.name, // Теперь `name` всегда присутствует
				children: await getFolderHierarchy(folder.$id),
			})
		)
	)

	return foldersWithChildren
}
