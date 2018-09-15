import axios from 'axios';

import {
  startLoading,
  stopLoading,
  setError,
  unsetError,
  expandMaterials,
  clearMaterials,
  getMaterials
} from '@/actions/materials';

jest.mock('axios', () => ({
  get: jest.fn().mockReturnValue(
    Promise.resolve({
      data: {
        pages: 3,
        page: 1,
        perPage: 2,
        search: '',
        order: '-rating',
        total: 5,
        data: [
          {
            id: 1,
            type: 'audio',
            title: 'Material title 1',
            url: 'audio1.mp3',
            rating: 100
          },
          {
            id: 2,
            type: 'audio',
            title: 'Material title 2',
            url: 'audio2.mp3',
            rating: 50
          }
        ]
      }
    })
  )
}));

jest.mock('@/constants/apiUrls', () => ({
  MATERIALS_API_URL: 'http://domain.name/materials'
}));

jest.mock('@/constants/actionTypes/materials', () => ({
  START_LOADING: 'MATERIALS_START_LOADING',
  STOP_LOADING: 'MATERIALS_STOP_LOADING',
  SET_ERROR: 'MATERIALS_SET_ERROR',
  UNSET_ERROR: 'MATERIALS_UNSET_ERROR',
  EXPAND_MATERIALS: 'MATERIALS_EXPAND_MATERIALS',
  CLEAR_MATERIALS: 'MATERIALS_CLEAR_MATERIALS'
}));

describe('startLoading', () => {
  it('should return "START_LOADING" action', () => {
    const action = { type: 'MATERIALS_START_LOADING' };

    expect(startLoading()).toEqual(action);
  });
});

describe('stopLoading', () => {
  it('should return "STOP_LOADING" action', () => {
    const action = { type: 'MATERIALS_STOP_LOADING' };

    expect(stopLoading()).toEqual(action);
  });
});

describe('setError', () => {
  it('should return "SET_ERROR" action', () => {
    const error = '404';

    const action = {
      type: 'MATERIALS_SET_ERROR',
      payload: error
    };

    expect(setError(error)).toEqual(action);
  });
});

describe('unsetError', () => {
  it('should return "UNSET_ERROR" action', () => {
    const action = { type: 'MATERIALS_UNSET_ERROR' };

    expect(unsetError()).toEqual(action);
  });
});

describe('expandMaterials', () => {
  it('should return "EXPAND_MATERIALS" action', () => {
    const materials = {
      endpoint: 'audio',
      pages: 3,
      page: 1,
      perPage: 2,
      search: '',
      order: '-rating',
      total: 5,
      data: [
        {
          id: 1,
          type: 'audio',
          title: 'Material title 1',
          url: 'audio1.mp3',
          rating: 100
        },
        {
          id: 2,
          type: 'audio',
          title: 'Material title 2',
          url: 'audio2.mp3',
          rating: 50
        }
      ]
    };

    const action = {
      type: 'MATERIALS_EXPAND_MATERIALS',
      payload: materials
    };

    expect(expandMaterials(materials)).toEqual(action);
  });
});

describe('clearMaterials', () => {
  it('should return "CLEAR_MATERIALS" action', () => {
    const action = { type: 'MATERIALS_CLEAR_MATERIALS' };

    expect(clearMaterials()).toEqual(action);
  });
});

describe('getMaterials', () => {
  const params = {
    endpoint: 'audio',
    page: 1,
    perPage: 2,
    search: '',
    order: '-rating'
  };

  const dispatch = jest.fn().mockImplementation(value => value);

  const getState = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch "CLEAR_MATERIALS" action when received new endpoint', async () => {
    getState.mockReturnValue({
      materials: {
        loading: false,
        error: null,
        endpoint: 'video',
        pages: 3,
        page: 1,
        perPage: 2,
        search: '',
        order: '-rating',
        total: 5,
        data: [
          {
            id: 1,
            type: 'video',
            title: 'Material title 1',
            url: 'video1.mp4',
            rating: 100
          },
          {
            id: 2,
            type: 'video',
            title: 'Material title 2',
            url: 'video2.mp4',
            rating: 50
          }
        ]
      }
    });

    const action = { type: 'MATERIALS_CLEAR_MATERIALS' };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "CLEAR_MATERIALS" action when received new search', async () => {
    getState.mockReturnValue({
      materials: {
        loading: false,
        error: null,
        endpoint: 'audio',
        pages: 3,
        page: 1,
        perPage: 2,
        search: 'material',
        order: '-rating',
        total: 5,
        data: [
          {
            id: 1,
            type: 'audio',
            title: 'Material title 1',
            url: 'audio1.mp3',
            rating: 100
          },
          {
            id: 2,
            type: 'audio',
            title: 'Material title 2',
            url: 'audio2.mp3',
            rating: 50
          }
        ]
      }
    });

    const action = { type: 'MATERIALS_CLEAR_MATERIALS' };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "CLEAR_MATERIALS" action when received new order', async () => {
    getState.mockReturnValue({
      materials: {
        loading: false,
        error: null,
        endpoint: 'audio',
        pages: 3,
        page: 1,
        perPage: 2,
        search: '',
        order: 'date',
        total: 5,
        data: [
          {
            id: 1,
            type: 'audio',
            title: 'Material title 1',
            url: 'audio1.mp3',
            rating: 100
          },
          {
            id: 2,
            type: 'audio',
            title: 'Material title 2',
            url: 'audio2.mp3',
            rating: 50
          }
        ]
      }
    });

    const action = { type: 'MATERIALS_CLEAR_MATERIALS' };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "START_LOADING" action', async () => {
    const action = { type: 'MATERIALS_START_LOADING' };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should get material', async () => {
    const url = `http://domain.name/materials/${params.endpoint}`;

    const config = {
      params: {
        page: params.page,
        perPage: params.perPage,
        search: params.search,
        order: params.order
      }
    };

    await getMaterials(params)(dispatch, getState);

    expect(axios.get).toHaveBeenCalledWith(url, config);
  });

  it('should dispatch "UNSET_ERROR" action', async () => {
    const action = { type: 'MATERIALS_UNSET_ERROR' };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "EXPAND_MATERIALS" action when materials data is not empty', async () => {
    const action = {
      type: 'MATERIALS_EXPAND_MATERIALS',
      payload: {
        endpoint: 'audio',
        pages: 3,
        page: 1,
        perPage: 2,
        search: '',
        order: '-rating',
        total: 5,
        data: [
          {
            id: 1,
            type: 'audio',
            title: 'Material title 1',
            url: 'audio1.mp3',
            rating: 100
          },
          {
            id: 2,
            type: 'audio',
            title: 'Material title 2',
            url: 'audio2.mp3',
            rating: 50
          }
        ]
      }
    };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "CLEAR_MATERIALS" action when materials data is empty', async () => {
    axios.get.mockReturnValue(
      Promise.resolve({
        data: {
          pages: 1,
          page: 1,
          perPage: 2,
          search: '',
          order: '-rating',
          total: 0,
          data: []
        }
      })
    );

    const action = { type: 'MATERIALS_CLEAR_MATERIALS' };

    await getMaterials(params)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch "STOP_LOADING" action', async () => {
    const action = { type: 'MATERIALS_STOP_LOADING' };

    await getMaterials(params)(dispatch, getState);

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
          type: 'MATERIALS_SET_ERROR',
          payload: '404'
        };

        await getMaterials(params)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(action);
      });

      it('should dispatch "STOP_LOADING" action', async () => {
        const action = { type: 'MATERIALS_STOP_LOADING' };

        await getMaterials(params)(dispatch, getState);

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
          type: 'MATERIALS_SET_ERROR',
          payload: 'Error'
        };

        await getMaterials(params)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(action);
      });

      it('should dispatch "STOP_LOADING" action', async () => {
        const action = { type: 'MATERIALS_STOP_LOADING' };

        await getMaterials(params)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(action);
      });
    });
  });
});
