import { House, Star, Trash, Users } from 'lucide-react'

export const AuthNavigation = [
	{
		link: '/password-reset',
		text: 'Reset your password',
		additionalText: 'We`ll send you a 6-digit code.',
	},
	{
		link: '/confirm-password',
		text: 'Enter confirmation code',
		additionalText: 'We sent a code to your email.',
	},
	{
		link: '/new-password',
		text: 'Create a new password',
		additionalText: 'Must be at least 8 characters',
	},
	{
		link: '/password-success-reset',
		text: 'Password reset!',
		additionalText: 'Success. Click to log in magically',
	},
]

export const Navigation = [
	{
		link: '/dashboard',
		text: 'My Cloud',
		icon: <House />,
	},
	{
		link: '/dashboard/shared-file',
		text: 'Shared file',
		icon: <Users />,
	},
	{
		link: '/dashboard/starred',
		text: 'Starred',
		icon: <Star />,
	},
	{
		link: '/dashboard/recycle-bin',
		text: 'Recycle bin',
		icon: <Trash />,
	},
]
