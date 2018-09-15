import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '@/components/Tabs';

describe('<Tabs />', () => {
  const itemClassName = 'tabs__item';
  const selectedItemClassName = `${itemClassName} tabs__item--active`;

  const props = {
    items: [
      {
        id: 1,
        name: 'Text',
        value: 'text'
      },
      {
        id: 2,
        name: 'Audio',
        value: 'audio'
      },
      {
        id: 3,
        name: 'Video',
        value: 'video'
      }
    ],
    onItemSelect: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Tabs {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should select first item on create when items exist', () => {
    const wrapper = shallow(<Tabs {...props} />);

    const {
      state: { selectedItem }
    } = wrapper.instance();

    const [item] = props.items;

    expect(selectedItem).toBe(item);
  });

  it('should not select first item on create when items do not exist', () => {
    const wrapper = shallow(
      <Tabs
        {...props}
        items={[]}
      />
    );

    const {
      state: { selectedItem }
    } = wrapper.instance();

    expect(selectedItem).toBe(null);
  });

  it('should select item on item click', () => {
    const wrapper = shallow(<Tabs {...props} />);

    const [_, item] = props.items;

    wrapper.find(`.${itemClassName}`).at(1).simulate('click');

    const {
      state: { selectedItem }
    } = wrapper.instance();

    expect(selectedItem).toBe(item);
  });

  it('should call onItemSelect on item click', () => {
    const wrapper = shallow(<Tabs {...props} />);

    const [_, item] = props.items;

    wrapper.find(`.${itemClassName}`).at(1).simulate('click');

    expect(props.onItemSelect).toHaveBeenCalledWith(item);
  });

  it('should render correctly after item selection', () => {
    const wrapper = shallow(<Tabs {...props} />);

    wrapper.find(`.${itemClassName}`).at(1).simulate('click');

    expect(wrapper).toMatchSnapshot();
  });

  describe('selectItem', () => {
    it('should select item', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [item] = props.items;

      wrapper.instance().selectItem(item)();

      const {
        state: { selectedItem }
      } = wrapper.instance();

      expect(selectedItem).toBe(item);
    });

    it('should call onItemSelect', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [item] = props.items;

      wrapper.instance().selectItem(item)();

      expect(props.onItemSelect).toHaveBeenCalledWith(item);
    });
  });

  describe('isItemSelected', () => {
    it('should return false when selected item does not exist', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [item] = props.items;

      wrapper.setState({ selectedItem: null });

      const isItemSelected = wrapper.instance().isItemSelected(item.id);

      expect(isItemSelected).toBeFalsy();
    });

    it('should return true', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [item] = props.items;

      wrapper.setState({ selectedItem: item });

      const isItemSelected = wrapper.instance().isItemSelected(item.id);

      expect(isItemSelected).toBeTruthy();
    });

    it('should return false', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [firstItem, secondItem] = props.items;

      wrapper.setState({ selectedItem: firstItem });

      const isItemSelected = wrapper.instance().isItemSelected(secondItem.id);

      expect(isItemSelected).toBeFalsy();
    });
  });

  describe('getItemClassName', () => {
    it('should return item class name', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [item] = props.items;

      wrapper.instance().isItemSelected = jest.fn().mockReturnValue(false);

      const className = wrapper.instance().getItemClassName(item.id);

      expect(className).toBe(itemClassName);
    });

    it('should return selected item class name', () => {
      const wrapper = shallow(<Tabs {...props} />);

      const [item] = props.items;

      wrapper.instance().isItemSelected = jest.fn().mockReturnValue(true);

      const className = wrapper.instance().getItemClassName(item.id);

      expect(className).toBe(selectedItemClassName);
    });
  });
});
