import { useContext, useMemo } from "react"

import { List, Paper } from "@mui/material"
import { EntryCard } from "."
import { EntriesContext } from "@/context/entries"
import { UIContext } from "@/context/ui"

import styles from "./EntryList.module.css"

export const EntryList = ({status}) => {

  const {entries, updateEntry} = useContext(EntriesContext);
  const {isDragging, endDragging} = useContext(UIContext)
  // Es una funcion que regresa un valor y lo memoriza cada vez que los entries cambien
  const entriesByStatus = useMemo(() =>  entries.filter(entry => entry.status === status), [entries]);
  

  const allowDrop = (event) => {
    event.preventDefault(); 
    
  }

  const onDropEntry = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text")
    const entry = entries.find(entry => entry._id === id);
    entry.status = status;
    updateEntry(entry)
    endDragging();
  } 


  return (
    <div 
        onDrop={onDropEntry} 
        onDragOver={allowDrop} 
        className={isDragging ? styles.dragging : ""}
        >
        <Paper sx={{height : 'calc(100vh - 200px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 5px'}}>
            
            
            <List sx={{opacity: isDragging ? 0.2 : 1, transition: "all .3s"}}>
                {entriesByStatus.map(entry => (
                    <EntryCard key={entry._id} entry={entry}/>
                ))}                 
                       
            </List>
        </Paper>
    </div>
  )
}
