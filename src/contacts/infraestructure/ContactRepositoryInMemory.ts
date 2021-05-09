import { ContactRepository } from '../domain/ContactRepository'
import { Contact } from '../domain/Contact'

const CONTACT_LIST: { [key: string]: Contact } = {
	Pepe: {
		name: 'Pepe',
		address: 'Calle de pepe',
		phone: '+XXXXXXXXXXX'
	},
	Luis: {
		name: 'Luis',
		address: 'Calle de luis',
		phone: '+YYYYYYYYYYY'
	},
	Juan: {
		name: 'Juan',
		address: 'Calle de juan',
		phone: '+ZZZZZZZZZZZ'
	}
}

export class ContactRepositoryInMemory implements ContactRepository {

	async getContacts (): Promise<Contact[]> {
		return Object.values(CONTACT_LIST)
	}

	async findByName (name: string): Promise<Contact|undefined> {
		return Object.keys(CONTACT_LIST)
			.filter(key => key.toUpperCase().includes(name.toUpperCase()))
			.map(key => CONTACT_LIST[key])[0]
	}

	async addContact (contact: Contact): Promise<void> {
		CONTACT_LIST[contact.name] = {
			name: contact.name,
			address: contact.address,
			phone: contact.phone
		}
	}
}
