export function formatFromDateToTime(date: Date) {
	const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
	return new Intl.DateTimeFormat('default', options).format(date);
}


