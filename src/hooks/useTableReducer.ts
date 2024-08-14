import { useReducer } from 'react';
import { Obj } from '@/constants';

interface TableState {
  data?: any[] | Function;
  params?: Obj;
  pageIndex?: number;
  pageSize?: number;
  total?: number;
  loading?: boolean;
  isMore?: boolean;
}

const initState: Required<TableState> = {
  data: [],
  params: {},
  pageIndex: 1,
  pageSize: 15,
  total: 0,
  loading: true,
  isMore: true,
};

const tableReducer = (preState: Required<TableState>, action: { type: 'success' | 'error' | 'params' | 'clear' | 'init'; payload: TableState }): Required<TableState> => {
  switch (action.type) {
    case 'init':
      return {
        ...preState,
        loading: true,
      };
    case 'success':
      if (typeof action.payload?.data === 'function') {
        return {
          ...preState,
          ...action.payload,
          data: action.payload.data(preState.data),
          loading: false,
        };
      }
      return {
        ...preState,
        ...action.payload,
        loading: false,
      };
    case 'params':
      if (typeof action.payload?.params === 'function') {
        return {
          ...preState,
          params: action.payload.params(preState.params),
        };
      }
      return {
        ...preState,
        params: { ...preState.params, ...action.payload.params },
      };
    case 'clear':
      return { ...initState, loading: false };
    case 'error':
      return { ...initState, loading: false };
    default:
      return preState;
  }
};

export const useTableReducer = (defaultState?: TableState): (Required<TableState> | any)[] => useReducer(tableReducer, {
    ...initState,
    ...defaultState,
  });
