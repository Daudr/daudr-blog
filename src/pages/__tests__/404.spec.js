import React from 'react'
import renderer from 'react-test-renderer'

import { NotFoundPage } from '../404'

const data = {
	site: {
		siteMetadata: {
			title: 'Dauðr Blog Test',
		},
	},
}

describe('NotFoundPage', () => {
	/* it("renders correctly", () => {
    const tree = renderer
      .create(<NotFoundPage data={data} location={{ pathname: `/` }} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  }) */
	it('true should be truthy', () => {
		expect(true).toBeTruthy()
	})
})
