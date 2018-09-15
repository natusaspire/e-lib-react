import React, { PureComponent } from 'react';

const ITEM_CLASS_NAME = 'tabs__item';

const SELECTED_ITEM_CLASS_NAME = `${ITEM_CLASS_NAME}--active`;

class Tabs extends PureComponent {
  state = { selectedItem: this.props.items[0] || null };

  selectItem = item => () => {
    const { onItemSelect } = this.props;

    this.setState({ selectedItem: item }, () => onItemSelect(item));
  };

  renderItem = item => (
    <div
      key={item.id}
      className={this.getItemClassName(item.id)}
      onClick={this.selectItem(item)}
    >
      {item.name}
    </div>
  );

  isItemSelected = id => {
    const { selectedItem } = this.state;

    return !!selectedItem && selectedItem.id === id;
  };

  getItemClassName = id =>
    this.isItemSelected(id)
      ? `${ITEM_CLASS_NAME} ${SELECTED_ITEM_CLASS_NAME}`
      : ITEM_CLASS_NAME;

  render() {
    const { items } = this.props;

    return <div className="tabs">{items.map(this.renderItem)}</div>;
  }
}

export default Tabs;
