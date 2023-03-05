import React, {Fragment, useEffect, useState} from 'react';
import {List,ListItem ,ListItemText,Typography, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useVehicleContext } from '../../VehicleContextProvider';
import axios from 'axios';

const Catalog = () => {

    const {
        vehicles,setVehicles,
        vehicle,setVehicle,
        editMode,setEditMode,
        vehicleStatus,
        category,
    } = useVehicleContext()

    const [vehiclesByStatus,setVehiclesByStatus]=useState([]);
    
    useEffect(() => {
        //const vehicleStatus=["active","inactive"]
        const getVehicleTypes=()=>{
            console.log(vehicles)
            const initData=vehicleStatus.reduce((vehicles, category) => ({
                ...vehicles,
                [category]:[]
            }),{})
            return Object.entries(
                vehicles.reduce((vehicles, vehicle) => {
                    const {active}=vehicle
                    vehicles[active] = [...vehicles[active],vehicle]
                    return vehicles;
                },initData)
            )
        }
        setVehiclesByStatus(getVehicleTypes())
        
    }, [vehicles]);

    const onItemSelect=(id)=>{
        setVehicle(vehicles.find(item => item.id===id))
        setEditMode(false)
     }
    const onDeleteItem = (id) => {
        //delete vehicle from the local data
        const tempVehicles=vehicles.filter(item => item.id!==id);
        setVehicles(tempVehicles)


        axios.delete("http://localhost:8080/api/tbo_v1/bus/"+id)
        .then(res=>{
          console.log(res)
        })
        

        setEditMode(vehicle.id===id ? false : editMode)
        setVehicle(vehicle.id===id ? {} : vehicle)
      }
   const onEditItem = (id) => {
        setVehicle(vehicles.find(item => item.id===id))
        setEditMode(true)
      }
    
    return ( 
        <>
            <Typography 
                variant={"h4" }
                style={{marginTop:20}}
                color="secondary"
                gutterBottom
                title="Media Resources"
            >
                All Buses
            </Typography>
           
            {
            vehiclesByStatus.map(([group,vehiclesByStatus]) => {
                return(
                    !category || category===group
                    ?<Fragment key={group}>
                        <Typography 
                          variant="h6" 
                          color="secondary"
                          style={{textTransform:'capitalize'}}
                          title={group}
                        >
                           {group}
                        </Typography>

                        <List component="nav" >
                            {
                                vehiclesByStatus.map( ({id,name}) => {
                                    return (
                                        <ListItem 
                                          button 
                                          key={name}
                                          title={name}
                                          onClick={ () => onItemSelect(id)}
                                        >
                                        <ListItemText 
                                            primary={name}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" title={name} aria-label="comments" onClick={()=>onEditItem(id)}>
                                                <EditIcon /> 
                                            </IconButton> 
                                            <IconButton edge="end" title={name+'del'} aria-label="comments" onClick={()=>onDeleteItem(id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Fragment>
                    :null  
                )
            })}
        </>
     )
}
 
export default Catalog;