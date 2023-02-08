//styles
import './Create.css';

import React, { useEffect, useRef, useState } from 'react';
// import { useFetch } from '../../hooks/useFetch';
import {projectFirestore} from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () =>{

    const [title, setTitle] = useState<string>('');
    const [method, setMethod] = useState<string>('');
    const [cookingTime, setCookingTime] = useState<string>('');
    const [newIngredient, setNewIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const ingredientInput = useRef<any | null>(null);
    // const { postData, data, error} = useFetch('http://localhost:3000/recipes', 'POST');
    const navigate = useNavigate();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes'};
        try{
           await projectFirestore.collection('recipes').add(doc)
           navigate('/');
        } catch(err){
            console.log(err)
        }
        setTitle('');
        setMethod('');
        setCookingTime('');
        setIngredients([]);
    }

    const handleAdd = (e:React.FormEvent) =>{
        e.preventDefault();
        const ing = newIngredient.trim();

        if(ing && !ingredients.includes(ing)){
            setIngredients(prevIngredients =>[...prevIngredients, ing]);
        }
        setNewIngredient('');
        ingredientInput.current.focus();
    }

    //redirects user when we get data response
    // useEffect(() =>{
    //     if(data){
    //         navigate('/');
    //     }
    // }, [data])

    return(
        <div className='create'>
            <h2 className='page-title'> Add a New Recipe</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Recipe Title</span>
                    <input
                        type="text"
                        onChange={(e)=> setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients</span>
                    <div className="ingredients">
                        <input
                            type="text"
                            onChange={(e)=>setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientInput}
                        />
                        <button className='btn' onClick={handleAdd}>add</button>
                    </div>
                </label>
                <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe method:</span>
                    <textarea
                        onChange={(e)=>setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>
                <label>
                    <span>Cooking Time (minutes):</span>
                    <input
                        type="number"
                        onChange={(e)=>setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>
                <button className='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Create;