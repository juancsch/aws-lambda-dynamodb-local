import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Contact } from '../domain/Contact'
import { ContactRepository } from '../domain/ContactRepository'

const contactsTableName = process.env.CONTACTS_TABLE_NAME as string

let options = {}
if (process.env.IS_OFFLINE === 'true') {
	options = {
		region: 'localhost',
		endpoint: 'http://localhost:8000',
		accessKeyId: 'DEFAULT_ACCESS_KEY',
		secretAccessKey: 'DEFAULT_SECRET'
	}
}

export class ContactRepositoryDynamoDB implements ContactRepository {

	private readonly dynamoClient: DocumentClient

	constructor () {
		console.log('*** ContactRepositoryDynamoDB:', contactsTableName)

		this.dynamoClient = new DocumentClient(options)
	}

	async getContacts (): Promise<Contact[]> {

		const queryResponse = await this.dynamoClient.scan({
			TableName: contactsTableName
		}).promise()

		console.log('*** getContacts:', queryResponse)

		if (queryResponse.Items === undefined) return []

		return queryResponse.Items.map(Contact.from)
	}

	async findByName (name: string): Promise<Contact|undefined> {

		const queryResponse = await this.dynamoClient.get({
			TableName: contactsTableName,
			Key: { name }
		}).promise()

		console.log('*** findByName:', name, queryResponse)

		if (queryResponse.Item === undefined) return undefined

		return Contact.from(queryResponse.Item)
	}

	async addContact (contact: Contact): Promise<void> {

		console.log('*** addContact:', contact)

		await this.dynamoClient.put({
			TableName: contactsTableName,
			Item: contact
		}).promise()
	}
}
