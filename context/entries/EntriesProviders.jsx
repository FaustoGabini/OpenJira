import { useEffect, useReducer } from "react";
import { EntriesContext, entriesReducer } from ".";
import { entriesApi } from "@/apis";
const Entries_INITIAL_STATE = {
    entries: [ 
    ], 
}

export const EntriesProvider = ({children}) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async (description) => {
       
        const {data} = await entriesApi.post('/entries', {description: description});

        dispatch({
            type: "ADD_ENTRY",
            payload: data
        })
    }

    const refreshEntries = async() => {
        const {data} = await entriesApi.get('/entries');
        dispatch({
            type: "REFRESH_DATA",
            payload: data
        })
    }

   

    const updateEntry = async({_id, description, status}) => {
      try {

        const {data} = await entriesApi.put(`/entries/${_id}`, {description,status});

        dispatch({
            type: "ENTRY_UPDATED",
            payload: data
        })
      } catch (error) {
        console.log(error)
        
      }
    }

     // Solo se ejecuta una vez
     useEffect(() => {
        refreshEntries();
    }, [])
    
    return (
        <EntriesContext.Provider 
            value={{
                ...state, 
                // Metodos
                addNewEntry,
                updateEntry,  
            }}>
            {children}
        </EntriesContext.Provider>
    )

} 
