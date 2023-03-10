import { useState, useEffect } from "react"

export const useFetch = (url:string, method="GET") => {
  const [data, setData] = useState<null>()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<any | null>()
  const [options, setOptions] = useState<any | null>();

  const postData = (postData:any) =>{
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions:any) => {
      setIsPending(true)
      
      try {
        const res = await fetch(url, {...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setIsPending(false)
        setData(data)
        setError(null)
      } catch (err:any) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }
    }

    if( method === "GET"){
      fetchData("")
    }
    if(method === "POST" && options){
      fetchData(options);
    }

    return () => {
      controller.abort()
    }

  }, [url, options, method])

  return { data, isPending, error, postData }
}