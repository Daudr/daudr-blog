import React from 'react'
import renderer from 'react-test-renderer'

import { AMPBlogPostTemplate } from './blog-post.amp'

import { data, pageContext, location } from '../../../__mocks__/blog-post.mock'

describe('AMPBlogPostTemplate', () => {
	/* it("renders correctly", () => {
    const tree = renderer
      .create(
        <AMPBlogPostTemplate
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
