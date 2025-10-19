import { useState, useEffect } from 'react';

type FetchCallback<P> = (params?: P) => Promise<any>;

const useFetchData = <T, P>(options: { fn: FetchCallback<P>; params?: P })  => {
    const { fn, params } = options;
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fn(params);
            setData(result);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fn, params]);

    return { data, isLoading, error, refetch: fetchData };
};

export default useFetchData;