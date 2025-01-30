import { getTotalSpaceUsed } from '@/lib/actions/file.actions'
import StorageChart from '../charts/StorageChart'
import { convertFileSize } from '@/lib/utils/convertFileSize'
import { FileImage, FileMusic, FileText, FileVideo, Folder } from 'lucide-react'
import FileTypeCard from '../ui/cards/FileTypeCard'

export default async function StoragePanel() {
	const storage = await getTotalSpaceUsed()

	const usedStorage = convertFileSize(storage.used)
	const totalStorage = convertFileSize(storage.all)
	const imageTotalSize = convertFileSize(storage.image.size)
	const documentTotalSize = convertFileSize(storage.document.size)
	const audioTotalSize = convertFileSize(storage.audio.size)
	const videoTotalSize = convertFileSize(storage.video.size)
	const otherTotalSize = convertFileSize(storage.other.size)

	const filesData = [
		{
			icon: <FileImage width={22} height={22} />,
			text: 'Images',
			fileCount: storage.image.fileCount,
			totalSize: imageTotalSize,
		},
		{
			icon: <FileText width={22} height={22} />,
			text: 'Documents',
			fileCount: storage.document.fileCount,
			totalSize: documentTotalSize,
		},
		{
			icon: <FileMusic width={22} height={22} />,
			text: 'Audio files',
			fileCount: storage.audio.fileCount,
			totalSize: audioTotalSize,
		},
		{
			icon: <FileVideo width={22} height={22} />,
			text: 'Video files',
			fileCount: storage.video.fileCount,
			totalSize: videoTotalSize,
		},
		{
			icon: <Folder width={22} height={22} />,
			text: 'Other files',
			fileCount: storage.other.fileCount,
			totalSize: otherTotalSize,
		},
	]

	return (
		<div className='py-14 flex flex-col justify-between '>
			<div>
				<h3 className='text-[22px] text-center font-semibold'>Storage</h3>
				<StorageChart
					usedStorage={storage.used}
					totalStorage={storage.all}
					convertedUsedStorage={usedStorage}
					convertedTotalStorage={totalStorage}
				/>
			</div>

			<div className='flex flex-col gap-4 px-8'>
				{filesData.map((file, index) => (
					<FileTypeCard
						key={index}
						image={file.icon}
						text={file.text}
						fileCount={file.fileCount}
						totalSize={file.totalSize}
					/>
				))}
			</div>
		</div>
	)
}
