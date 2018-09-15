import React, { memo } from 'react';

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

const materialTypes = new Map()
  .set(TEXT_MATERIAL, MaterialText)
  .set(AUDIO_MATERIAL, MaterialAudio)
  .set(VIDEO_MATERIAL, MaterialVideo);

const Material = ({ material }) => {
  const { data, loading, error } = material;

  if (data) {
    const MaterialType = materialTypes.get(data.type);

    return (
      <MaterialTypeWrapper>
        <MaterialType material={data} />
      </MaterialTypeWrapper>
    );
  } else if (loading) {
    return <MaterialTypeWrapper />;
  } else {
    return <Error status={error} />;
  }
};

export default memo(Material);
