import Sidebar from '@/components/sidebars/Sidebar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='sticky left-0 w-1/4 h-screen flex bg-white'>
			{/* <Sidebar /> */}
			<div className='w-3/4 min-h-screen bg-white-main'>{children}</div>
		</div>
	)
}
