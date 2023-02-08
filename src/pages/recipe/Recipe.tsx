//styles
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { useTheme } from '../../hooks/useTheme';
import {projectFirestore} from '../../firebase/config';
import './Recipe.css';

const Recipe = () =>{
    const {id} = useParams();
    // const url = 'http://localhost:3000/recipes/' + id;
    // const {data: recipe, isPending, error}:any = useFetch(url);
    const {mode}:any = useTheme();

    const [recipe, setRecipe] = useState<any>()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState<any | null>()

    useEffect(()=>{
        setIsPending(true);

        const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc:any)=>{
            if(doc.exists){
                setIsPending(false);
                setRecipe(doc.data());
            } else{
                setIsPending(false);
                setError('Could not find that recipe')
            }
        })

        return () => unsub();
    },[id])

    const handleClick = (id:any) =>{
        projectFirestore.collection('recipes').doc(id).update({
            title: 'Something different'
        })
    }

    return(
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {recipe && (
                <>
                    <h2 className='page-title' key={recipe.id}>{recipe.title}</h2>
                    <p>Takes {recipe.cookingTime} to cook</p>
                    <ul>
                        {recipe.ingredients.map((ing:any) =><li key={ing}>{ing}</li>)}
                    </ul>
                    <p className='method'>{recipe.method}</p>
                    <button onClick={()=>handleClick(id)}>Update</button>
                </>
            )}
        </div>
    )
}

export default Recipe;