import React from "react"
import renderer from "react-test-renderer"
import { StaticQuery } from "gatsby"

import Tags from "./tags-it"

import { data } from "../../../__mocks__/tags-template.mock"

import * as bioData from "../../../__mocks__/bio.mock"

beforeEach(() => {
  // Serve per la Bio che un figlio diretto di Tags
  StaticQuery.mockImplementationOnce(({ render }) => render(bioData.data))
})

describe("ItalianTags", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Tags pageContext={{ tag: `angular` }} data={data} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
