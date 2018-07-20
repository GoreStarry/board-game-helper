import React from 'react'
import { shallow } from 'enzyme'

import CardLists from '../CardLists'

describe('CardLists', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<CardLists {...props} />,{
      // disableLifecycleMethods: true,
    })
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})