import React from "react"
import { configure, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

const TestHook = ({ callback }) => {
  callback()
  return null
}

export const testHook = callback => {
  mount(<TestHook callback={callback} />)
}
