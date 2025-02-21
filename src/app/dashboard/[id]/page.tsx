import { notFound, redirect } from 'next/navigation'
import { getFolderHierarchy } from '@/lib/actions/folder.actions'
import ButtonCreateFolder from '@/components/ui/buttons/ButtonCreateFolder'
import ButtonAddFiles from '@/components/ui/buttons/ButtonAddFiles'
import { getLoggedInUser } from '@/lib/server/appwrite'

type Props = {
	params: { id: string }
}

export default async function FolderPage({ params }: Props) {
	const currentUser = await getLoggedInUser()
	// console.log('🚀 ~ DashboardPage ~ currentUser:', currentUser)

	if (!currentUser) {
		redirect('/sign-in')
	}

	const { id } = params
	console.log('🚀 ~ FolderPage ~ id:', id)
	const folders = await getFolderHierarchy(id) // Получаем массив папок
	console.log('🚀 ~ FolderPage ~ folders:', folders)

	// if (!folders || folders.length === 0) return notFound() // Если папка не найдена, 404

	const folder = folders[0] // Берем первую папку из массива

	return (
		<div>
			<div className='flex gap-3'>
				<ButtonCreateFolder accountId={currentUser.accountId} />
				<ButtonAddFiles
					ownerId={currentUser.$id}
					accountId={currentUser.accountId}
				/>
			</div>
			{folders.length !== 0 ? (
				<div>
					<h1>Папка: {folder.name}</h1>
					<ul>
						{folder.children.map(child => (
							<li key={child.$id}>
								<a href={`/dashboard/${child.$id}`}>{child.name}</a>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div>Папка пуста</div>
			)}
		</div>
	)
}
