export const entriesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ENTRY":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
     case "REFRESH_DATA":
        return {
          ...state,
          entries: [...action.payload],
        };

      case "ENTRY_UPDATED":
            return {...state, 
                    entries: state.entries.map(entry => {
              if(entry._id === action.payload._id){
                entry.status = action.payload.status;
                entry.description = action.payload.description;
            }
            return entry;
          })
          
          }
    default:
      return state;
  }
};
