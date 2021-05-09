import { Contact } from './Contact'

export interface ContactRepository {

	getContacts(): Promise<Contact[]>

	findByName(name: string): Promise<Contact|undefined>

	addContact(contact: Contact): Promise<void>
}
