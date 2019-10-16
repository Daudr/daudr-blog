import React from 'react'
import { StaticQuery } from 'gatsby'
import renderer from 'react-test-renderer'

import Bio from './bio'

import { data } from '../../../__mocks__/bio.mock'

beforeEach(() => {
	StaticQuery.mockImplementationOnce(({ render }) => render(data))
})

describe('Bio', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<Bio />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
