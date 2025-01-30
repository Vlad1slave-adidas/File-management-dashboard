'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip } from 'chart.js'

export default function StorageChart({
	usedStorage,
	totalStorage,
	convertedUsedStorage,
	convertedTotalStorage,
}: StorageChartProps) {
	Chart.register(ArcElement, Tooltip)

	const data = {
		datasets: [
			{
				data: [usedStorage, totalStorage - usedStorage], // Использовано и оставшееся место
				backgroundColor: ['#FFA660', '#F5F1F2'], // Цвета: оранжевый и светло-серый
				borderWidth: 0, // Убираем границы
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: false,
			},
		},
		rotation: -90,
		circumference: 180,
		cutout: '57%',
		maintainAspectRatio: true,
		responsive: true,
	}

	return (
		<div className='flex flex-col items-center'>
			<div className='relative w-48 h-48'>
				<Doughnut data={data} options={options} />
				<div className='absolute bottom-0 left-0 right-0 translate-y-4 flex flex-col items-center justify-center gap-1'>
					<p className='text-2xl font-semibold'>{convertedUsedStorage}</p>
					<p className='text-sm text-gray-default'>
						of {convertedTotalStorage} capacity
					</p>
				</div>
			</div>
		</div>
	)
}
