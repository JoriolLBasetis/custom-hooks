import { useEffect, useState } from "react"

const localCache = {}

export const useFetch = (url) => {
    const [state, setstate] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    })

    useEffect(() => {
        getFetch(url);
    }, [url])

    const setLoadingState = () => {
        setstate({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFetch = async (url) => {
        if (localCache[url]){
            console.log('usin cache');
            setstate({ data:localCache[url], isLoading: false, hasError: false, error: null })
            return;
        }
        setLoadingState();

        const resp = await fetch(url)
        await new Promise(resolve => setTimeout(resolve, 2000))
        if (!resp.ok) {
            setstate({
                data: null,
                isLoading: false,
                hasError: true,
                error: resp.status
            })
            return;
        }
        const data = await resp.json();
        setstate({ data, isLoading: false, hasError: false, error: null })
        localCache[url] = data;
    }
    /*  */
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}
