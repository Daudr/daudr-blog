import React from "react"
import renderer from "react-test-renderer"

import Layout from "./layout"

import { location } from "../../../__mocks__/location.mock"

describe("Layout", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Layout location={location} title={`Layout Test`} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
