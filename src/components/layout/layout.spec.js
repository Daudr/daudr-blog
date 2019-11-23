import React from 'react'
import { StaticQuery } from 'gatsby'
import renderer from 'react-test-renderer'

import Layout from './layout'

import { location } from '../../../__mocks__/location.mock'

import { data } from '../../../__mocks__/bio.mock'

beforeEach(() => {
	StaticQuery.mockImplementationOnce(({ render }) => render(data))
})

describe('Layout', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<Layout
					location={location}
					title={`Layout Test`}
					defaultLang='IT'
					setSelectedLanguage={() => {}}
				/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
