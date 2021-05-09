import { addContactFactory } from '../src/contacts/application/add-contact'
import { findByNameFactory } from '../src/contacts/application/find-contact'
import { getContactsFactory } from '../src/contacts/application/get-contacts'
import { Contact } from '../src/contacts/domain/Contact'

describe('Contacts', () => {

	test('should not find contact', async () => {

		const repository = {
			addContact: jest.fn(),
			getContacts: jest.fn(),
			findByName: jest.fn().mockReturnValue(undefined)
		}
		const findByName = findByNameFactory(repository)

		const contact = await findByName('xxx')

		expect(repository.findByName).toHaveBeenNthCalledWith(1, 'xxx')
		expect(contact).toBeUndefined()
	})

	test('should find contact', async () => {

		const repository = {
			addContact: jest.fn(),
			getContacts: jest.fn(),
			findByName: jest.fn().mockReturnValue({})
		}
		const findByName = findByNameFactory(repository)

		const contact = await findByName('luis')

		expect(repository.findByName).toHaveBeenNthCalledWith(1, 'luis')
		expect(contact).toEqual({})
	})

	test('should get all contacts', async () => {

		const repository = {
			addContact: jest.fn(),
			getContacts: jest.fn().mockReturnValue([]),
			findByName: jest.fn()
		}
		const getContacts = getContactsFactory(repository)

		const contacts = await getContacts()

		expect(repository.getContacts).toHaveBeenCalled()
		expect(contacts).toEqual([])
	})

	test('should add contact', async () => {

		const repository = {
			addContact: jest.fn(),
			getContacts: jest.fn(),
			findByName: jest.fn()
		}
		const addContact = addContactFactory(repository)

		const contact = new Contact('Jose', 'Calle de jose', '+SSSSSSSSSSS')
		await addContact(contact)

		expect(repository.addContact).toHaveBeenNthCalledWith(1, contact)
	})
})
