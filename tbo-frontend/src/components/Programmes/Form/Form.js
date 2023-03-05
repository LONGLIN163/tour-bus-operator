import React,{useState,useEffect} from 'react';
import {FormControl,MenuItem,InputLabel,Select,TextField,Button} from '@material-ui/core';
import { useVehicleContext } from '../../VehicleContextProvider';
import axios from 'axios';


const Form = ({updateVehicle}) => {

    const [id,setId]=useState('');
    const [name,setName]=useState('');
    const [imageUrl,setImageUrl]=useState('');
    const [client,setClient]=useState('');
    const [location,setLocation]=useState('');
    const [active,setActive]=useState('');

    const {
        setOpenDialog,vehicleStatus,
        vehicles,setVehicles,
        vehicle,setVehicle,
        setEditMode
    } = useVehicleContext()
    
    useEffect(() => {
        if(updateVehicle){
            setId(vehicle.id)
            setName(vehicle.name)
            setImageUrl(vehicle.imageUrl)
            setClient(vehicle.client)
            setLocation(vehicle.location)
            setActive(vehicle.active)
        }
    },[])

    const handleChange=({target:{value,name}}) => {
        if(name==="name"){
            setName(value);
            if(!vehicle){
                setId(value);
            }
        }
        if(name==="imageUrl") setImageUrl(value);
        if(name==="client") setClient(value);
        if(name==="location") setLocation(value);
        if(name==="active") setActive(value);
    };

    const onSubmit = (tempVehicle) => {
        //create a new arr with vehicles which doest have in-edit vehicle
        const tempVehicleArr=vehicles.filter(item => item.id!==vehicle.id);
        //add edited vehicle back 
        tempVehicleArr.push(tempVehicle)
        //update vehicle in local
        setVehicles(tempVehicleArr)

        if(updateVehicle){
            axios.put(
                "http://localhost:8080/api/tbo_v1/bus/"+id,
                null,
                {
                    params:{
                    name:name,
                    location:location,
                    imageUrl:imageUrl,
                    client:client,
                    active:active
                }}
            )
           .then(res=>{
            //console.log(res)
           })
        }else{
            axios.post("http://localhost:8080/api/tbo_v1/bus",tempVehicle)
            .then(res=>{
             //console.log(res)
            })
        }

        //set preview vehicle no matter new one or updated one
        //setVehicle(vehicle)

        setId('')
        setName('')
        setImageUrl('')
        setClient('')
        setLocation('')
        setActive('')
        setOpenDialog(false)

        setEditMode(false)
     }

    const handleSubmit = () => {

        const tempVehicle={
            ...vehicle,
            name,
            imageUrl,
            client,
            location,
            active
        }

        onSubmit(tempVehicle)
    }

    return (<>
                <form action="" title="formPane">
                    <TextField
                        label="Name"
                        value={name}
                        name='name'
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <label htmlFor=""><img src={imageUrl} style={{width:300}} alt="" /></label>
                    <TextField
                        label="Image"
                        value={imageUrl}
                        name='imageUrl'
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <TextField
                        label="Client"
                        value={client}
                        name='client'
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <TextField
                        label="Location"
                        value={location}
                        name='location'
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                    />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={active}
                            name='active'
                            onChange={handleChange}
                        >
                            {

                                vehicleStatus.map( (cat) => {
                                    return(
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <br />
                    <Button
                        variant="contained"
                        color="secondary"
                        title="formbtn"
                        onClick={handleSubmit}
                        disabled={!name || !vehicleStatus}
                    >
                        { updateVehicle ? 'Update' : 'Create' }
                    </Button>

                </form>
    </>);
    
}
 
export default Form;