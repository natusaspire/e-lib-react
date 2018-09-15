import React from 'react';
import { shallow } from 'enzyme';

import MaterialPreview from '@/components/MaterialPreview';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('<MaterialPreview />', () => {
  it('should render material preview', () => {
    const props = {
      endpoint: 'text',
      material: {
        id: 1,
        type: 'text',
        title: 'Material title',
        textContent: 'Material text content.'
      },
      image: 'text.png'
    };

    const wrapper = shallow(<MaterialPreview {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
