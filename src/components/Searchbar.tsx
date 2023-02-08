//styles
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css'

const Searchbar = () =>{

    const [term, setTerm] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault();

        navigate(`/search?q=${term}`);
    }

    return(
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='search'>Search:</label>
                <input 
                type='text' 
                id='search'
                onChange={(e)=>setTerm(e.target.value)}
                required
                value={term}
                />
            </form>
        </div>
    )
}

export default Searchbar;