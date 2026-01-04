import { useEffect, useState } from "react"
import axios from "axios"

const useFetch =(url) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getData = async (url) => {
        try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
        } catch (error) {
        setError(error);
        setLoading(false);
        }
    };
    useEffect(() => {getData(url)}, [url]);

    const reFetchData = async(url) =>{
        if(!url) return
        try{
            const response = await axios.get(url)
            setData(response.data)
            setLoading(false)
        }
        catch(error){
            setError(error)
        }
    }

    return {data, error, loading, reFetchData}
}

export default useFetch