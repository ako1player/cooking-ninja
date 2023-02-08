import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './RecipeList.css';
import Trashcan from '../assets/trashcan.svg';
import {projectFirestore} from '../firebase/config';

const RecipeList = ({recipes}:any) =>{
    const {mode}:any = useTheme();
    if(recipes.length === 0){
        return <div className='error'>No Recipes to load...</div>
    }

    //delete item from colletion using ID
    const handleClick = (id:any) =>{
        projectFirestore.collection('recipes').doc(id).delete();
    }

    return(
        <div className='recipe-list'>
            {recipes.map((recipe:any)=>(
                <div key={recipe.id} className={`card ${mode}`}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0,100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                    <img
                        className='delete'
                        src={Trashcan}
                        onClick={()=>handleClick(recipe.id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default RecipeList;