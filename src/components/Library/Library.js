import React, { PureComponent } from 'react';

import {
  MATERIALS_TEXT_ENDPOINT,
  MATERIALS_AUDIO_ENDPOINT,
  MATERIALS_VIDEO_ENDPOINT
} from '@/constants/endpoints';
import Toolbar from '@/components/Toolbar';
import Tabs from '@/components/Tabs';
import MaterialPreviewList from '@/components/MaterialPreviewList';

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

class Library extends PureComponent {
  selectTabItem = ({ value: endpoint }) => {
    const { onUpdate } = this.props;

    onUpdate({ endpoint });
  };

  render() {
    const { endpoint, materials } = this.props;

    return (
      <div className="main">
        <div className="main__container main__toolbar--fixed">
          <Toolbar title="Toolbar">
            <Tabs
              items={TABS}
              onItemSelect={this.selectTabItem}
            />
          </Toolbar>
        </div>
        <div className="main__container main__content">
          <MaterialPreviewList
            endpoint={endpoint}
            materials={materials}
          />
        </div>
      </div>
    );
  }
}

export default Library;
