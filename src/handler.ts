import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { findByName, getContacts, addContact } from './contacts'
import { Contact } from './contacts/domain/Contact'

// const corsHeaders = {
// 'Access-Control-Allow-Origin': '*', // Required for CORS support to work
// 'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
// }

export const getContactsHandler: APIGatewayProxyHandler = async () => {
	return {
		statusCode: 200,
		body: JSON.stringify(await getContacts())
	}
}

export const findByNameHandler: APIGatewayProxyHandler = async event => {

	const name: string|undefined = event.pathParameters?.name

	if (name === undefined) {
		return {
			statusCode: 400,
			headers: {
				'content-type': 'plain/text'
			},
			body: 'Name is mandatory'
		}
	}

	const contact = await findByName(name)

	if (contact === undefined) {
		return {
			statusCode: 404,
			headers: {
				'content-type': 'plain/text'
			},
			body: 'Contact is not found'
		}
	}

	return {
		statusCode: 200,
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(contact)
	}
}

export async function addContactsHandler (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

	if (event.body === null) {
		return {
			statusCode: 400,
			headers: {
				'content-type': 'plain/text'
			},
			body: 'Contact data is mandatory'
		}
	}

	await addContact(Contact.from(event.body))

	return {
		statusCode: 201,
		headers: {
			'content-type': 'plain/text'
		},
		body: ''
	}
}
