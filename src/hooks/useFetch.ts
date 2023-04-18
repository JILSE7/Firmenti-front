
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { AxiosCall } from '../interfaces/axios.interface';
import { toast } from 'sonner';

const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async <T>(axiosCall: AxiosCall<T>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<T>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data.error ?? "Error desconocido")
      console.log(err);
      throw err
    }
    setLoading(false);
    return result.data;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint };
};

export default useFetchAndLoad;
