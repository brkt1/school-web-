import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

const useDebounce = <T>(initialParams: T, delay : number = 300, onSubscribe: (t: T) => void) => {
    const [change, setChange] = useState<T>(initialParams);

    const debounced = useCallback(
        debounce((params) => {onSubscribe(params)}, delay),
        [delay, onSubscribe]
    );

    useEffect(() => {
        debounced(change);
        // Cleanup function to cancel debounce if the component unmounts
        return () => {
            debounced.cancel();
        };
    }, [change]);

    const handleChange = (newParams: T) => {
        setChange(newParams);
    };

    return {
        change,
        handleChange,
    };
};

export default useDebounce;
