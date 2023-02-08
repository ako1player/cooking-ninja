//styles
import './Home.css';
// import { useFetch } from '../../hooks/useFetch';
import {projectFirestore} from '../../firebase/config';
import { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';

const Home = () =>{

    const [data, setData] = useState<null>()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<any | null>()
    // const { data, isPending, error}:any = useFetch('http://localhost:3000/recipes');

    useEffect(()=>{
        setIsPending(true);

       const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot:any)=>{
            if(snapshot.empty){
                setError('No recipes to load')
                setIsPending(false);
            } else{
                let results:any = [];
                snapshot.docs.forEach((doc:any) => {
                    results.push({id: doc.id, ...doc.data()})
                })
                setData(results);
                setIsPending(false);
            }
        }, (err)=>{
            setError(err.message);
            setIsPending(false);
        })

        return () => unsub();
    },[])

    return(
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {data && <RecipeList recipes={data}/>}
        </div>
    )
}

export default Home;