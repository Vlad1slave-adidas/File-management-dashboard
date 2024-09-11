export const getCurrentDate = (): string => {
	const date = new Date()
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}
	return date.toLocaleDateString('en-US', options)
}
