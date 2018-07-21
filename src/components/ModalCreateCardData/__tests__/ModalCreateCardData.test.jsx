import React from 'react'
import { shallow } from 'enzyme'

import ModalCreateCardData from '../ModalCreateCardData'

describe('ModalCreateCardData', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<ModalCreateCardData {...props} />,{
      // disableLifecycleMethods: true,
    })
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})