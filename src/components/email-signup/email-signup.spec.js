import React, { useState } from 'react'
import renderer from 'react-test-renderer'

import EmailSignup from './email-signup'
import { testHook } from '../../utils/test-utils'

let invalidEmail

describe('EmailSignup', () => {
	beforeEach(() => {
		testHook(() => {
			invalidEmail = useState(false)
		})
	})

	it('renders correctly', () => {
		const tree = renderer.create(<EmailSignup />).toJSON()
		expect(tree).toMatchSnapshot()
	})

	/* it("should display an error text on invalid email", () => {
    expect(invalidEmail).toBeFalsy();

    const component = renderer.create(<EmailSignup />);

    component.checkMail('invalidemail');

    expect(invalidEmail).toBeTruthy();
    
  }) */
})
