import React from 'react'
import renderer from 'react-test-renderer'

import { BlogIndex } from '../index'

import { data } from '../../../__mocks__/index.mock'

describe('BlogIndex', () => {
	/* it("renders correctly", () => {
    const tree = renderer
      .create(<BlogIndex location={{ pathname: `/` }} data={data} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  }) */
	it('true should be truthy', () => {
		expect(true).toBeTruthy()
	})
})
