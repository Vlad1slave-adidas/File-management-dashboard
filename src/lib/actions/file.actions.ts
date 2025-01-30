'use server'

import { ID, ImageFormat, ImageGravity, Query } from 'node-appwrite'
import {
	createAdminClient,
	createSessionClient,
	getLoggedInUser,
} from '../server/appwrite'
import { appwriteConfig } from '../server/config'
import { InputFile } from 'node-appwrite/file'
import { getFileType } from '../utils/getFileType'
import { constructFileUrl } from '../utils/getUrl'
import { revalidatePath } from 'next/cache'

export const parseStringify = (value: unknown) =>
	JSON.parse(JSON.stringify(value))

export const uploadFile = async ({
	formData,
	ownerId,
	accountId,
	path,
}: UploadFileParams) => {
	const { storage, databases } = await createAdminClient()

	try {
		const file = formData.get('file') as File
		if (!file) {
			throw new Error('File not found in FormData')
		}

		console.log('🚀 ~ uploadFile ~ file:', file)
		const inputFile = InputFile.fromBuffer(file, file.name)
		console.log('🚀 ~ uploadFile ~ inputFile:', inputFile)

		const bucketFile = await storage.createFile(
			appwriteConfig.bucketId,
			ID.unique(),
			inputFile
		)
		console.log('🚀 ~ uploadFile ~ bucketFile:', bucketFile)

		const fileDocument = {
			type: getFileType(bucketFile.name).type,
			name: bucketFile.name,
			url: constructFileUrl(bucketFile.$id),
			extension: getFileType(bucketFile.name).extension,
			size: bucketFile.sizeOriginal,
			owner: ownerId,
			accountId,
			users: [],
			bucketField: bucketFile.$id,
		}

		const newFile = await databases
			.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.filesCollectionId,
				ID.unique(),
				fileDocument
			)
			.catch(async (error: any) => {
				await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id)
				// throw new Error('Failed to create file document')
				throw new Error(error.message)
			})

		revalidatePath(path)
		return parseStringify(newFile)
		// console.log('🚀 ~ newFile:', newFile)
		// return newFile
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const getFiles = async () => {
	const { databases } = await createSessionClient()

	try {
		const currentUser = await getLoggedInUser()

		if (!currentUser) throw new Error('User not found')

		const queries = [
			Query.or([
				Query.equal('owner', [currentUser.$id]),
				Query.contains('users', [currentUser.email]),
			]),
		]

		const files = await databases.listDocuments(
			appwriteConfig.databaseId, // databaseId
			appwriteConfig.filesCollectionId, // collectionId
			queries // queries (optional)
		)

		console.log(files)
		return files
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const getFilePreview = async (id: string) => {
	try {
		const { storage } = await createSessionClient()

		const result = await storage.getFilePreview(
			appwriteConfig.bucketId, // bucketId
			id // fileId
		)

		return result
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export async function getTotalSpaceUsed() {
	try {
		const { databases } = await createSessionClient()
		const currentUser = await getLoggedInUser()
		if (!currentUser) throw new Error('User is not authenticated.')

		const files = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.filesCollectionId,
			[Query.equal('owner', [currentUser.$id])]
		)

		const totalSpace = {
			image: { size: 0, fileCount: 0, latestDate: '' },
			document: { size: 0, fileCount: 0, latestDate: '' },
			video: { size: 0, fileCount: 0, latestDate: '' },
			audio: { size: 0, fileCount: 0, latestDate: '' },
			other: { size: 0, fileCount: 0, latestDate: '' },
			used: 0,
			all: 2 * 1024 * 1024 * 1024 /* 2GB available bucket storage */,
		}

		files.documents.forEach(file => {
			const fileType = file.type as FileType
			totalSpace[fileType].size += file.size
			totalSpace[fileType].fileCount += 1
			totalSpace.used += file.size

			if (
				!totalSpace[fileType].latestDate ||
				new Date(file.$updatedAt) > new Date(totalSpace[fileType].latestDate)
			) {
				totalSpace[fileType].latestDate = file.$updatedAt
			}
		})

		return parseStringify(totalSpace)
	} catch (error: any) {
		throw new Error('Error calculating total space used', error.message)
	}
}
