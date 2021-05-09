import { Contact } from '../domain/Contact'
import { ContactRepository } from '../domain/ContactRepository'

export function getContactsFactory (contactRepository: ContactRepository) {

	return async (): Promise<Contact[]> => {

		return contactRepository.getContacts()
	}
}
