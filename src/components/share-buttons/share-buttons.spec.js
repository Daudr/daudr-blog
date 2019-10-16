import React from 'react'
import renderer from 'react-test-renderer'

import { ShareButtons } from './share-buttons'

describe('ShareButtons', () => {
	it('renders correctly', () => {
		const tree = renderer
			.create(
				<ShareButtons
					postNode={{ frontmatter: { title: 'Blog Post Title' } }}
					url={`https://blog.daudr.me/a-post`}
				/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})
})
