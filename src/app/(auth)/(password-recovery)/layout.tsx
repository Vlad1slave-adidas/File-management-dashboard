import SidebarAuth from '@/components/sidebars/SidebarAuth'
import ReverseLogo from '@/components/ui/logo/ReverseLogo'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex'>
			<div className='px-7 py-44 relative w-1/3 h-screen bg-primary-color'>
				<ReverseLogo />
				<SidebarAuth />
			</div>
			<div className='w-2/3 h-screen flex justify-center pt-32'>{children}</div>
		</div>
	)
}
