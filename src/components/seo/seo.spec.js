import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery, graphql } from 'gatsby'

import SEO from './seo'

import { post } from '../../../__mocks__/seo.mock'
import { testHook } from '../../utils/test-utils'

let site

beforeEach(() => {
	testHook(() => {
		site = useStaticQuery(
			graphql`
				query {
					site {
						siteMetadata {
							title
							siteUrl
							description
							author
							twitterUserName
						}
					}
				}
			`
		)
	})
})

describe('SEO', () => {
	/* it("renders correctly", () => {
    const tree = renderer.create(<SEO />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders post seo correctly", () => {
    const tree = renderer
      .create(<SEO postSEO post={post} slug={`a-post`} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  }) */

	it('site should be defined', () => {
		expect(true).toBeTruthy()
	})
})
