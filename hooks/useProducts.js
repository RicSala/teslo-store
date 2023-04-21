import swr from "swr"
// const fetcher = (...args) => fetch(...args).then(res => res.json()) // we are gonna create a global configuration 
// Creates a fetcher function to be used by SWR. It's just a wrapper around fetch() that returns the response body as JSON.

export const useProducts = (url, config) => {
    
	const { data, error, isLoading } = swr(`/api${ url }`, config) // Fetches the data from the API endpoint and returns the data and error if any.

    return {
        products: data || [], //TODO: why is this necessary?
        isLoading,
        isError: error
    }
}