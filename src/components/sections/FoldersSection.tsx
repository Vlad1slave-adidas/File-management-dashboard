'use client'

import { useState } from 'react'
import FolderCard from '../ui/cards/FolderCard'
import ButtonDropdown from '../ui/buttons/ButtonDropdown'

export default function FoldersSection({ folders }: { folders: Folder[] }) {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	return (
		<section>
			<div className='flex items-center gap-2 mb-5'>
				<h4>Folders</h4>
				<ButtonDropdown
					width={20}
					height={20}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</div>
			{isOpen && (
				<div className='flex gap-4'>
					{folders.map(folder => (
						<FolderCard key={folder.$id} id={folder.$id} name={folder.name} />
					))}
				</div>
			)}
		</section>
	)
}
