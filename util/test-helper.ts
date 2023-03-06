import { Request, Response } from 'express'

export function createRequestWithSession() {
	return {
        session: {
            user: {}
        },
		body: {},
        query: {},
		params: {}
	} as unknown as Request
}

export function createEmptyRequest() {
	return {
		body: {},
        query: {},
		params: {}
	} as unknown as Request
}

export function createEmptyResponse() {
    const res = {json: jest.fn(() => null)};

	return {
		status: jest.fn((status: number) => res),
		redirect: jest.fn(() => null)
	} as unknown as Response
}
