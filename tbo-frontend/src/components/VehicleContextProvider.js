
import React, { useEffect,useState,createContext,useContext} from 'react';
import axios from 'axios';
export const VehicleContext = createContext({})
export const useVehicleContext = () => useContext(VehicleContext);

export const VehicleContextProvider = ({children}) => {
    const [vehicles,setVehicles]=useState([]);
    const [category,setCategory]=useState('');
    const [openDialog,setOpenDialog]=useState(false);
    const [editMode,setEditMode]=useState(false);
    const [vehicle,setVehicle]=useState({});
    const vehicleStatus=["active","inactive"]

    useEffect(() => {
      const fetchData=async ()=>{
              const data=await axios
              .get("http://localhost:8080/api/tbo_v1/bus")
              .then(
                  (res)=>{
                      console.log(res.data)
                      return res.data
                  }
              )
              setVehicles(data)
            }
            fetchData()
    },[]) 
          
    const onCatSelect=(category)=>{
        setCategory(category)
    }

    const contextValue={
          vehicles,setVehicles,
          vehicle,setVehicle,
          editMode,setEditMode,
          vehicleStatus,
          category,
          openDialog,setOpenDialog,
          onCatSelect,
      }

    return ( 
        <VehicleContext.Provider value={contextValue}>
            {children}
        </VehicleContext.Provider>
     );
}
