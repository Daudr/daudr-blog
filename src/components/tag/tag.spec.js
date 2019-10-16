import React from 'react'
import renderer from 'react-test-renderer'

import { Tag } from './tag'

describe('Tag', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<Tag />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
