import { Contact } from '../domain/Contact'
import { ContactRepository } from '../domain/ContactRepository'

export function findByNameFactory (contactRepository: ContactRepository) {

	return async (name: string): Promise<Contact|undefined> => {

		return contactRepository.findByName(name)
	}
}
