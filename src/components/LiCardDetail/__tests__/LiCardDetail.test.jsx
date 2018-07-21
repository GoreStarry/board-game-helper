import React from 'react'
import { shallow } from 'enzyme'

import LiCardDetail from '../LiCardDetail'

describe('LiCardDetail', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<LiCardDetail {...props} />,{
      // disableLifecycleMethods: true,
    })
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})