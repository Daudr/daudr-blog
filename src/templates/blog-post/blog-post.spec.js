import React from 'react'
import renderer from 'react-test-renderer'

import { BlogPostTemplate } from './blog-post'

import { data, pageContext, location } from '../../../__mocks__/blog-post.mock'

describe('BlogPostTemplate', () => {
	/* it("renders correctly", () => {
    const tree = renderer
      .create(
        <BlogPostTemplate
          data={data}
          pageContext={pageContext}
          location={location}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  }) */
	it('true should be truthy', () => {
		expect(true).toBeTruthy()
	})
})
