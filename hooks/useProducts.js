import swr from "swr"
// const fetcher = (...args) => fetch(...args).then(res => res.json()) // we are gonna create a global configuration 
// Creates a fetcher function to be used by SWR. It's just a wrapper around fetch() that returns the response body as an object.

export const useProducts = (url, config) => {

    const { data, error, isLoading } = swr(`/api${url}`, config) // Fetches the data from the API endpoint and returns the data and error if any.

    return {
        products: data || [],
        isLoading,
        isError: error
    }
}

// swr is a react hook that allows us to fetch data from the server and cache it in the browser.
// It also allows us to revalidate the data in the background and update the UI when the data changes.
