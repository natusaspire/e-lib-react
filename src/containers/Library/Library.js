import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getMaterials, clearMaterials } from '@/actions/materials';
import { MATERIALS_TEXT_ENDPOINT } from '@/constants/endpoints';
import { MATERIALS_ORDER } from '@/constants/orderTypes';
import Library from '@/components/Library';

const INITIAL_PARAMS = {
  endpoint: MATERIALS_TEXT_ENDPOINT,
  page: 1,
  perPage: 36,
  search: '',
  order: MATERIALS_ORDER.DATE.DESC
};

const PAGE_TITLE = 'Library';

const getCategoryTitle = category => `Library of ${category}`;

class LibraryContainer extends PureComponent {
  getMaterials = ({
    endpoint = INITIAL_PARAMS.endpoint,
    page = INITIAL_PARAMS.page,
    perPage = INITIAL_PARAMS.perPage,
    search = INITIAL_PARAMS.search,
    order = INITIAL_PARAMS.order
  }) => {
    const { getMaterials } = this.props;

    getMaterials({ endpoint, page, perPage, search, order });
  };

  componentDidMount() {
    const { getMaterials } = this.props;

    getMaterials(INITIAL_PARAMS);
  }

  componentDidUpdate() {
    const {
      materials: { endpoint }
    } = this.props;

    document.title = endpoint ? getCategoryTitle(endpoint) : PAGE_TITLE;
  }

  componentWillUnmount() {
    const { clearMaterials } = this.props;

    clearMaterials();
  }

  render() {
    const {
      materials: { endpoint, data }
    } = this.props;

    return (
      <Library
        endpoint={endpoint}
        materials={data}
        onUpdate={this.getMaterials}
      />
    );
  }
}

const mapStateToProps = ({ materials }) => ({ materials });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getMaterials, clearMaterials }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryContainer);
