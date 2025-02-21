import SearchField from '../ui/fields/SearchField'
import NotificationButton from '../ui/buttons/NotificationButton'
import Profile from '../ui/profile/Profile'

export default function Header({ avatar }: { avatar: string }) {
	return (
		<div className='flex justify-between mb-6'>
			<SearchField />
			<div className='flex items-center gap-8'>
				<NotificationButton />
				<Profile avatar={avatar} />
			</div>
		</div>
	)
}
