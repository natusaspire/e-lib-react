import React, { PureComponent } from 'react';

import {
  MATERIALS_TEXT_ENDPOINT,
  MATERIALS_AUDIO_ENDPOINT,
  MATERIALS_VIDEO_ENDPOINT
} from '@/constants/endpoints';
import MaterialPreview from '@/components/MaterialPreview';
import textImage from '@/assets/categories/text.png';
import audioImage from '@/assets/categories/audio.png';
import videoImage from '@/assets/categories/video.png';

const IMAGES = new Map()
  .set(MATERIALS_TEXT_ENDPOINT, textImage)
  .set(MATERIALS_AUDIO_ENDPOINT, audioImage)
  .set(MATERIALS_VIDEO_ENDPOINT, videoImage);

class MaterialPreviewList extends PureComponent {
  renderMaterial = material => {
    const { endpoint } = this.props;

    return (
      <div key={material.id} className="grid__item">
        <MaterialPreview
          endpoint={endpoint}
          material={material}
          image={IMAGES.get(endpoint)}
        />
      </div>
    );
  };

  render() {
    const { materials } = this.props;

    return (
      <div className="grid content">
        {materials.map(this.renderMaterial)}
      </div>
    );
  }
}

export default MaterialPreviewList;
