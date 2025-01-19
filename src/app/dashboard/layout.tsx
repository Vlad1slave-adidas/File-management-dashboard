import Sidebar from '@/components/sidebars/Sidebar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className=' h-screen grid grid-cols-[250px_1fr_300px] w-full  bg-white '>
			<Sidebar />
			<div className='w-full min-h-screen py-6'>
				<div className='py-10 px-12 w-full h-full bg-white-main rounded-[40px]'>
					{children}
				</div>
			</div>
			<div className='text-center py-16'>Storage</div>
		</div>
	)
}
