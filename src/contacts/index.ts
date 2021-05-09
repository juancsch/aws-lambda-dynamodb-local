import { findByNameFactory } from './application/find-contact'
import { getContactsFactory } from './application/get-contacts'
import { addContactFactory } from './application/add-contact'
import { ContactRepositoryDynamoDB } from './infraestructure/ContactRepositoryDynamoDB'

const contactRepository = new ContactRepositoryDynamoDB()

export const findByName = findByNameFactory(contactRepository)
export const getContacts = getContactsFactory(contactRepository)
export const addContact = addContactFactory(contactRepository)
