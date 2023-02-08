
import { createContext, useReducer } from "react";

export const ThemeContext = createContext({});

const themeReducer = (state:any, action:any) => {
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state, color: action.payload};
        case 'CHANGE_MODE':
            return {...state, mode: action.payload};
        default:
            return state;
    }
}

export function ThemeProvider({children}:any){
   const [state, dispatch] =  useReducer(themeReducer, {
        color: '#58249c',
        mode: 'dark'
    });

    const changeColor = (color:any) =>{
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }
    const changeMode = (mode:any )=>{
        dispatch({type: 'CHANGE_MODE', payload: mode})
    }

    return(
        <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}