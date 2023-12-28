

export const uiReducer = (state, action ) => {
    switch (action.type) {
        case "OPEN_SIDEMENU":
            return {...state, sidemenuOpen: true}
        case "CLOSE_SIDEMENU":
            return {...state, sidemenuOpen: false}
        case "IS_ADDING_ENTRY":
            return {...state, isAddingEntry: action.payload}

        case "START_DRAGING":
            return {...state, isDragging: true }
        case "END_DRAGING":
            return {...state, isDragging: false}
        
        default:
            return state;
    }
}