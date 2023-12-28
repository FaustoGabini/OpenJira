import { useReducer } from "react"
import { UIContext, uiReducer } from "."

const UI_INITIAL_STATE = {
    sidemenuOpen: false, 
    isAddingEntry: false, 
    isDragging: false
}

export const UIProvider = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({type: "OPEN_SIDEMENU"});

    }

    // closeSideMenu
    const closeSideMenu = () => {
        dispatch({type: "CLOSE_SIDEMENU"});
    }

    const setIsAddingEntry = (isAdding) => {
        dispatch({type: "IS_ADDING_ENTRY", payload: isAdding})
    }

    const startDragging = () => {
        dispatch({type: "START_DRAGING"})
    }
    const endDragging = () => {
        dispatch({type: "END_DRAGING"})
    }

    
  return ( 
    <UIContext.Provider 
    value={{...state,
        // Funciones 
            openSideMenu, 
            closeSideMenu,

            setIsAddingEntry, 

            startDragging, 
            endDragging
        }} 
    
    >
        {children}
    </UIContext.Provider>
  )
}

