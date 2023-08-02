export function formatFromDateToDMY(date: Date){
	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
	return new Intl.DateTimeFormat('default', options).format(date);
}