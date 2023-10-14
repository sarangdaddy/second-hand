import { useReducer, useEffect, DependencyList } from 'react';
import { AxiosResponse, AxiosError } from 'axios';

interface State<T> {
  isLoading: boolean;
  data: T | null;
  error: AxiosError | null;
}

type Action<T> =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; data: T }
  | { type: 'ERROR'; error: AxiosError };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        isLoading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

function useAsync<T>(
  callback: () => Promise<AxiosResponse<T>>,
  deps: DependencyList = [],
  skip = false,
): {
  isLoading: boolean;
  data: T | null;
  error: AxiosError | null;
  refetch: () => Promise<void>;
} {
  const initialState: State<T> = {
    isLoading: false,
    data: null,
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (): Promise<void> => {
    dispatch({ type: 'LOADING' });
    try {
      const response: AxiosResponse<T> = await callback();
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e as AxiosError });
    }
  };

  let ignore = false;

  useEffect(() => {
    if (skip) return;

    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, deps);

  const { isLoading, data, error } = state;

  return { isLoading, data: data as T, error, refetch: fetchData };
}

export default useAsync;
