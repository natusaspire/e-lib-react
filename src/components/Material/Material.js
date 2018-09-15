import React, { PureComponent } from 'react';

import {
  TEXT_MATERIAL,
  AUDIO_MATERIAL,
  VIDEO_MATERIAL
} from '@/constants/materialTypes';
import MaterialTypeWrapper from '@/components/MaterialTypeWrapper';
import MaterialText from '@/components/MaterialText';
import MaterialAudio from '@/components/MaterialAudio';
import MaterialVideo from '@/components/MaterialVideo';
import Error from '@/components/Error';

const renderMaterialTypeComponent = material => {
  switch (material.type) {
    case TEXT_MATERIAL:
      return <MaterialText material={material} />;
    case AUDIO_MATERIAL:
      return <MaterialAudio material={material} />;
    case VIDEO_MATERIAL:
      return <MaterialVideo material={material} />;
    default:
      return null;
  }
};

class Material extends PureComponent {
  componentDidMount() {
    const {
      getMaterial,
      match: { params }
    } = this.props;

    getMaterial(params);
  }

  componentDidUpdate() {
    const {
      material: { data }
    } = this.props;

    if (data) {
      document.title = data.title;
    }
  }

  componentWillUnmount() {
    const { unsetMaterial } = this.props;

    unsetMaterial();
  }

  render() {
    const {
      material: { data, error }
    } = this.props;

    return error ? (
      <Error status={error} />
    ) : (
      <MaterialTypeWrapper>
        {!!data && renderMaterialTypeComponent(data)}
      </MaterialTypeWrapper>
    );
  }
}

export default Material;
