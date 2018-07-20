import React from 'react'
import { shallow } from 'enzyme'

import CardTypeList from '../CardTypeList'

describe('CardTypeList', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<CardTypeList {...props} />,{
      // disableLifecycleMethods: true,
    })
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})