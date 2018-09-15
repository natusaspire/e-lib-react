import axios from 'axios';

import {
  startLoading,
  stopLoading,
  setError,
  unsetError,
  setMaterial,
  unsetMaterial,
  getMaterial
} from '@/actions/material';

jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        title: 'Material title',
        type: 'audio',
        url: 'audio.mp3'
      }
    })
  )
}));

jest.mock('@/constants/apiUrls', () => ({
  MATERIALS_API_URL: 'http://domain.name/materials'
}));

jest.mock('@/constants/actionTypes/material', () => ({
  START_LOADING: 'MATERIAL_START_LOADING',
  STOP_LOADING: 'MATERIAL_STOP_LOADING',
  SET_ERROR: 'MATERIAL_SET_ERROR',
  UNSET_ERROR: 'MATERIAL_UNSET_ERROR',
  SET_MATERIAL: 'MATERIAL_SET_MATERIAL',
  UNSET_MATERIAL: 'MATERIAL_UNSET_MATERIAL'
}));

describe('startLoading', () => {
  it('should return "START_LOADING" action', () => {
    const action = { type: 'MATERIAL_START_LOADING' };

    expect(startLoading()).toEqual(action);
  });
});

describe('stopLoading', () => {
  it('should return "STOP_LOADING" action', () => {
    const action = { type: 'MATERIAL_STOP_LOADING' };

    expect(stopLoading()).toEqual(action);
  });
});

describe('setError', () => {
  it('should return "SET_ERROR" action', () => {
    const error = '404';

    const action = {
      type: 'MATERIAL_SET_ERROR',
      payload: error
    };

    expect(setError(error)).toEqual(action);
  });
});

describe('unsetError', () => {
  it('should return "UNSET_ERROR" action', () => {
    const action = { type: 'MATERIAL_UNSET_ERROR' };

    expect(unsetError()).toEqual(action);
  });
});

describe('setMaterial', () => {
  it('should return "SET_MATERIAL" action', () => {
    const material = {
      title: 'Material title',
      type: 'audio',
      url: 'audio.mp3'
    };

    const action = {
      type: 'MATERIAL_SET_MATERIAL',
      payload: material
    };

    expect(setMaterial(material)).toEqual(action);
  });
});

describe('unsetMaterial', () => {
  it('should return "UNSET_MATERIAL" action', () => {
    const action = { type: 'MATERIAL_UNSET_MATERIAL' };

    expect(unsetMaterial()).toEqual(action);
  });
});

describe('getMaterial', () => {
  const params = {
    endpoint: 'audio',
    id: 1
  };

  const dispatch = jest.fn().mockImplementation(value => value);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch "START_LOADING" action', async () => {
    const action = { type: 'MATERIAL_START_LOADING' };

    await getMaterial(params)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should get material', async () => {
    const url = `http://domain.name/materials/${params.endpoint}/${params.id}`;

    await getMaterial(params)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(url);
  });

  it('should dispatch "UNSET_ERROR" action', async () => {
    const action = { type: 'MATERIAL_UNSET_ERROR' };

    await getMaterial(params)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "SET_MATERIAL" action', async () => {
    const action = {
      type: 'MATERIAL_SET_MATERIAL',
      payload: {
        title: 'Material title',
        type: 'audio',
        url: 'audio.mp3'
      }
    };

    await getMaterial(params)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "STOP_LOADING" action', async () => {
    const action = { type: 'MATERIAL_STOP_LOADING' };

    await getMaterial(params)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  describe('error', () => {
    describe('"error.response" exists', () => {
      beforeAll(() => {
        axios.get.mockReturnValue(
          Promise.reject({
            response: { status: 404 }
          })
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should dispatch "SET_ERROR" action', async () => {
        const action = {
          type: 'MATERIAL_SET_ERROR',
          payload: '404'
        };

        await getMaterial(params)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(action);
      });

      it('should dispatch "STOP_LOADING" action', async () => {
        const action = { type: 'MATERIAL_STOP_LOADING' };

        await getMaterial(params)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe('"error.response" does not exist', () => {
      beforeAll(() => {
        axios.get.mockReturnValue(Promise.reject({ message: 'Error' }));
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should dispatch "SET_ERROR" action', async () => {
        const action = {
          type: 'MATERIAL_SET_ERROR',
          payload: 'Error'
        };

        await getMaterial(params)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(action);
      });

      it('should dispatch "STOP_LOADING" action', async () => {
        const action = { type: 'MATERIAL_STOP_LOADING' };

        await getMaterial(params)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
