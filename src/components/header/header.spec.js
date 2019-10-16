import React from 'react'
import renderer from 'react-test-renderer'

import { Header } from './header'

import { location } from '../../../__mocks__/location.mock'

describe('Header', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(<Header location={location} title={`Header Test`} />)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
