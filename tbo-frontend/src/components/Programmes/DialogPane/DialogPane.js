import React from 'react';
import {Dialog,DialogContent,DialogContentText,DialogTitle,Fab,} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useVehicleContext } from '../../VehicleContextProvider';
import Form from '../Form/Form';

const DialogPane = () => {
    const {openDialog,setOpenDialog} = useVehicleContext()

    const handleToggle=() => {
        setOpenDialog(!openDialog)
    }

    return (
            <>
                <Fab 
                    color="secondary" 
                    aria-label="add" 
                    onClick={handleToggle}
                    size="small"
                    title="addProgramBtn"
                >
                    <AddIcon />
                </Fab>

                <Dialog 
                    aria-labelledby="form-dialog-title"
                    open={openDialog ? openDialog : false }
                    onClose={handleToggle}
                    fullWidth
                >
                    <DialogTitle>
                        Create an item
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            please fill out the form below......
                        </DialogContentText>
                        <Form/>
                    </DialogContent>

                </Dialog>

            </>

        );
}
 
export default DialogPane;

