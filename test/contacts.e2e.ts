import 'jest-extended'
import http from 'http'

describe('Contacts', function () {

	test('should get all contacts', async () => {

		const res = await fetch('/dev/contact')

		expect(res.statusCode).toEqual(200)
		expect(res.body).toIncludeSameMembers([
			{ name: 'Pepe', address: 'Calle de pepe', phone: '+XXXXXXXXXXX' },
			{ name: 'Luis', address: 'Calle de luis', phone: '+YYYYYYYYYYY' },
			{ name: 'Juan', address: 'Calle de juan', phone: '+ZZZZZZZZZZZ' }
		])
	})

	test('should find contact', async () => {

		const res = await fetch('/dev/contact/Luis')

		expect(res.statusCode).toEqual(200)
		expect(res.body).toEqual({
			name: 'Luis',
			address: 'Calle de luis',
			phone: '+YYYYYYYYYYY'
		})
	})

	test('should not find contact', async () => {

		const res = await fetch('/dev/contact/xxx')

		expect(res.statusCode).toEqual(404)
		expect(res.body).toEqual('Contact is not found')
	})

	test('should not find contact', async () => {

		const res = await fetch('/dev/contact', null, 'PUT')

		expect(res.statusCode).toEqual(400)
		expect(res.body).toEqual('Contact data is mandatory')
	})

	test('should add contact', async () => {

		const res = await fetch('/dev/contact', { name: 'Paco', address: 'Calle de paco', phone: '+AAAAAAAAAAA' }, 'PUT')

		expect(res.statusCode).toEqual(201)
		expect(res.body).toEqual('')
	})

	type HttpResponse = {
		statusCode: number|undefined
		body: any
	}

	async function fetch (path: string, data: any = null, method = 'GET'): Promise<HttpResponse> {

		return await new Promise((resolve, reject) => {

			const options = { hostname: 'localhost', port: 3000, path, method }
			const rq = http.request(options, response => {
				let data = ''
				response.on('data', (chunk) => {
					data += chunk // eslint-disable-line @typescript-eslint/restrict-plus-operands
				})
				response.on('end', () => {
					let body = data
					if ((response?.headers['content-type']?.includes('application/json')) === true) {
						body = JSON.parse(data)
					}
					resolve({
						statusCode: response.statusCode,
						body
					})
				})
			}).on('error', (err) => {
				reject(err)
			})

			if (method !== 'GET') rq.write(JSON.stringify(data))

			rq.end()
		})
	}
})
