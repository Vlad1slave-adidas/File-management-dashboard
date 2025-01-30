export function formatDate(isoString: string): string {
	const date = new Date(isoString)

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	}

	return new Intl.DateTimeFormat('en-US', options).format(date)
}
