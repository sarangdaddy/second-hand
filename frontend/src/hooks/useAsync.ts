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

  useEffect(() => {
    let isCancelled = false; // 취소 플래그

    const fetchData = async () => {
      console.log('Fetch Data 시작'); // 시작 로그
      dispatch({ type: 'LOADING' });
      try {
        const response: AxiosResponse<T> = await callback();
        if (!isCancelled) {
          console.log('Fetch Data 성공', response.data); // 성공 로그
          dispatch({ type: 'SUCCESS', data: response.data });
        } else {
          console.log('Fetch Data 취소됨'); // 취소 로그
        }
      } catch (e) {
        if (!isCancelled) {
          console.log('Fetch Data 실패', e); // 실패 로그
          dispatch({ type: 'ERROR', error: e as AxiosError });
        } else {
          console.log('Fetch Data 취소됨'); // 취소 로그
        }
      }
    };

    if (!skip) {
      fetchData();
    }

    return () => {
      isCancelled = true; // 클린업 시 취소 플래그 설정
      console.log('Cleanup 실행됨'); // 클린업 로그
    };
  }, deps);

  const { isLoading, data, error } = state;

  const refetch = async () => {
    const isCancelled = false;
    dispatch({ type: 'LOADING' });
    try {
      const response: AxiosResponse<T> = await callback();
      if (!isCancelled) {
        dispatch({ type: 'SUCCESS', data: response.data });
      }
    } catch (e) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', error: e as AxiosError });
      }
    }
  };

  return { isLoading, data: data as T, error, refetch };
}

export default useAsync;
