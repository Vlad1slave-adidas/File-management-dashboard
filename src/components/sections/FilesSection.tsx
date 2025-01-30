'use client'

import React, { useState } from 'react'
import FileCard from '../ui/cards/FileCard'
import { formatDate } from '@/lib/utils/formatDate'
import { ArrowUp } from 'lucide-react'
import ButtonDropdown from '../ui/buttons/ButtonDropdown'

export default function FilesSection({ files, fileIcons }: FilesSectionProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	return (
		<section className='flex-1 flex flex-col overflow-hidden'>
			<div className='flex items-center gap-2 mb-5'>
				<h4>Recent added</h4>
				<ButtonDropdown
					width={20}
					height={20}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</div>
			{files && isOpen && (
				<div className='flex-1 overflow-auto scrollbar'>
					<div className='w-full grid grid-cols-[9fr_4fr_5fr_1fr] items-center text-gray-default font-semibold text-sm mb-2'>
						<span className='flex items-center gap-[6px]'>
							<span>Name</span>
							<ArrowUp width={14} height={14} />
						</span>
						<span>Member</span>
						<span>Last Modified</span>
					</div>
					<div>
						{files.documents.map(
							(
								file: {
									$id: React.Key | null | undefined
									name: string
									url: string
									users: string | any[]
									$updatedAt: string
								},
								index: string | number
							) => (
								<FileCard
									key={file.$id}
									name={file.name}
									icon={fileIcons[index]}
									url={file.url}
									member={file.users.length}
									lastModified={formatDate(file.$updatedAt)}
								/>
							)
						)}
					</div>
				</div>
			)}
		</section>
	)
}
