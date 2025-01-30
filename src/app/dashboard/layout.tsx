import Header from '@/components/header/Header'
import StoragePanel from '@/components/panels/StoragePanel'
import Sidebar from '@/components/sidebars/Sidebar'
import { getLoggedInUser } from '@/lib/server/appwrite'
import { constructFileUrl } from '@/lib/utils/getUrl'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getLoggedInUser()

	if (!user) {
		redirect('/sign-in')
	}

	const avatar = constructFileUrl(user.avatar)
	return (
		<div className='h-screen grid grid-cols-[3fr_10fr_4fr] w-full  bg-white '>
			<Sidebar />
			<main className='w-full min-h-screen py-5'>
				<div className='py-7 px-12 w-full h-full bg-white-main rounded-[40px]'>
					<Header avatar={avatar} />
					{children}
				</div>
			</main>
			<StoragePanel />
		</div>
	)
}
