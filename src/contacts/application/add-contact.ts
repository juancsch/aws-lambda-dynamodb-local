import { Contact } from '../domain/Contact'
import { ContactRepository } from '../domain/ContactRepository'

export function addContactFactory (contactRepository: ContactRepository) {

	return async (contact: Contact): Promise<void> => {

		await contactRepository.addContact(contact)
	}
}
