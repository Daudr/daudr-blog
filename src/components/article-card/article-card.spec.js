import React from "react"
import renderer from "react-test-renderer"

import ArticleCard from "./article-card"

import { node } from "../../../__mocks__/article-card.mock"

describe("ArticleCard", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ArticleCard node={node} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
