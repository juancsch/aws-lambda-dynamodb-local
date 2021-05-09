
type KeyValue = {
	[key: string]: string
}

export class Contact {
	constructor (
		public readonly name: string,
		public readonly address: string,
		public readonly phone: string
	) {}

	static from (data: string|KeyValue): Contact {
		const contact = typeof data === 'string' ? JSON.parse(data) : data
		// TODO validate all properties
		return new Contact(contact.name, contact.address, contact.phone)
	}
}
