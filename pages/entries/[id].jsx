import { useContext, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { Layout } from "@/components/layout";
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { isValidObjectId } from "mongoose";
import { getEntryById } from "@/database/dbEntries";
import { EntriesContext } from "@/context/entries";
import { dateFunctions } from "@/utils";
const validStatus = ["pending", "in-progress", "finished"]



export const EntryPage = ({entry}) => {

    const {updateEntry} = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry?.description || "")
    const [status, setStatus] = useState(entry?.status || "pending")
    const [touched, setTouched] = useState(false)
    
    const isNotValid = useMemo(() => inputValue.length <=0  && touched, [inputValue, touched])


    const onInputValueChange = (e) => {   
        setInputValue(e.target.value)
    }

    const onStatusChange = (e) => {
       setStatus(e.target.value)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return;
        
        const updatedEntry = {
            ...entry, 
            status, 
            description: inputValue
        
        }

        updateEntry(updatedEntry);

    }

    return (

    <Layout title={inputValue.substring(0,20) + "..."}>
        <Grid 
            container
            justifyContent="center"
            sx={{marginTop: 2}}>
            <Grid item xs={12} sm={8} md={6}>
                <Card> 
                    <CardHeader title={`Entrada:`} subheader={`Creada: ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}/>
                    <CardContent>
                        <TextField 
                            sx={{marginTop: 2, marginBottom: 1}}
                            fullWidth
                            placeholder="Nueva Entrada"
                            autoFocus
                            multiline
                            label="Nueva entrada" 
                            value={inputValue}
                            onChange={onInputValueChange}
                            helperText={isNotValid && "Ingrese un valor"}
                            onBlur={() => setTouched(true)}
                            error={isNotValid}
                            />
                            <FormControl>
                                <FormLabel>Estado</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChange}
                                >
                                    {validStatus.map((status) => (
                                        <FormControlLabel 
                                            key={status} 
                                            value={status} 
                                            control={<Radio/>}
                                            label={capitalize(status)}/>
                                   
                                    ))}
                                </RadioGroup>
                            </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button 
                            startIcon={<SaveOutlinedIcon/>} 
                            variant="contained" 
                            fullWidth 
                            onClick={onSave}
                            disabled={inputValue.length <=0 }
                            >
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton sx={{
            position: 'fixed',
            bottom: 30, 
            right: 30,
            backgroundColor: 'error.dark',
        }}>
            <DeleteOutlineOutlinedIcon/>
        </IconButton>
    </Layout>


  )
}

// Solo usar cuando el usuario hace la solicitud a la pagina
// Estamos del lado del servidor
export const getServerSideProps = async ({params}) => {
    
    const {id} = params; 
    
   const entry =  await getEntryById(id)

    if(!isValidObjectId(id)) 
        return {redirect: 
                    {destination: "/", 
                    permanent: false}
                }

    return {
        props: {
            entry
        }
    }
}


export default EntryPage;