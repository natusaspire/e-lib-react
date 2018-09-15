import React, { PureComponent } from 'react';

import {
  MATERIALS_TEXT_ENDPOINT,
  MATERIALS_AUDIO_ENDPOINT,
  MATERIALS_VIDEO_ENDPOINT
} from '@/constants/endpoints';
import { MATERIALS_ORDER } from '@/constants/orderTypes';
import Toolbar from '@/components/Toolbar';
import Tabs from '@/components/Tabs';
import MaterialPreviewList from '@/components/MaterialPreviewList';

const INITIAL_PARAMS = {
  endpoint: MATERIALS_TEXT_ENDPOINT,
  page: 1,
  perPage: 36,
  search: '',
  order: MATERIALS_ORDER.DATE.DESC
};

const PAGE_TITLE = 'Library';

const TABS = [
  {
    id: 1,
    name: 'Text',
    value: MATERIALS_TEXT_ENDPOINT
  },
  {
    id: 2,
    name: 'Audio',
    value: MATERIALS_AUDIO_ENDPOINT
  },
  {
    id: 3,
    name: 'Video',
    value: MATERIALS_VIDEO_ENDPOINT
  }
];

const getCategoryTitle = category => `Library of ${category}`;

class Library extends PureComponent {
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

  selectTabItem = ({ value: endpoint }) => this.getMaterials({ endpoint });

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
      <div className="main">
        <div className="main__container main__toolbar--fixed">
          <Toolbar title="Toolbar">
            <Tabs items={TABS} onItemSelect={this.selectTabItem} />
          </Toolbar>
        </div>
        <div className="main__container main__content">
          <MaterialPreviewList endpoint={endpoint} materials={data} />
        </div>
      </div>
    );
  }
}

export default Library;
