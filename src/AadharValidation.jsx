import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function AadharValidation({formData, setFormData, onNext}){
     const [open, setOpen] = useState(false);
    let styles = {
        width: "100%",
        border: "2px solid black",
    
    }
    let formStyle = {
        textAlign: 'center',
    }
    let [otpNo,setOtpNo] = useState();
    function inputhandler(event){
        let{name,value} = event.target;
        
        if (name === "AadhaarNo") {
            const digitsOnly = value.replace(/\D/g, "").slice(0, 12);
            setFormData((curr) => ({ ...curr, [name]: digitsOnly }));
        } else {
            setFormData((curr) => ({ ...curr, [name]: value }));
        }
    }
    //submit form
    function submitForm(event){
        event.preventDefault();
        
        if(formData.AadhaarNo.length!==12){
            alert(` your aadhar length is${formData.AadhaarNo.length} Aadhaar number must have exactly 12 digits`);
            return;
        }
        if(formData.AadhaarNo!=='' || formData.AadhaarName!==''){
            setOpen(true);
           
        }
        
        
    }
    const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit(){
    console.log("otp:",otpNo);
    if(otpNo.length!==4){
        return(alert("OTP should be 4 digits"));
    }
    onNext();
  }


    return(
        <>
            
            <div style={styles}>
                <h4 style={{backgroundColor: '#01579b',color: 'white',marginTop:'0px',padding: '0.5rem'}}>Aadhar Validation With OTP</h4>
                
                    <div style={formStyle}>
                        <TextField name='AadhaarNo' id="aadharNo" label="1. Aadhaar Number" variant="standard" placeholder='Your Aadhaar number'  margin='normal'type='text' value={formData.AadhaarNo} required error={formData.AadhaarNo.length > 0 && formData.AadhaarNo.length !== 12}
                        helperText={
                            formData.AadhaarNo.length > 0 && formData.AadhaarNo.length !== 12
                            ? "Aadhaar number must be exactly 12 digits": ""
                        } onChange={inputhandler} />&nbsp;&nbsp;&nbsp;&nbsp;
                    
                        <TextField name='AadhaarName' id="AadhaarName" label="2. Name of Entrepreneur" variant="standard" placeholder='Name as per Aadhaar' margin='normal' type='text' value={formData.Aadhaarname} required onChange={inputhandler}/><br/>
                    </div>
                    <ul style={{justifyItems:'left',placeItems: 'left'}}>
                        <li>Aadhaar number shall be required for Udyam Registration.</li>
                        <li>The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</li>
                        <li>In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicablity of CGST Act 2017 and as notified by the ministry of MSME<a href='https://udyamregistration.gov.in/docs/225669.pdf'> vide S.O. 1055(E) dated 05th March 2021</a>) and PAN along with its Aadhaar number.</li>
                    </ul>
                    <p><input type="checkbox" defaultChecked required/> I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared.</p>
                    <Button type='button' variant="contained" style={{margin: '1rem'}} onClick={submitForm}>Validate & Generate OTP</Button>
                
            </div>
            <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter OTP</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    OTP is sent to your Aadhaar registered mobile number. Please enter a 4 digit otp to procced.
                </DialogContentText>
                <form onSubmit={handleSubmit} id="subscription-form">
                    <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="OTP"
                    label="One Time Password"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={otpNo}
                    onChange={(event)=>{const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 4);setOtpNo(digitsOnly)}}
                    />
                    <DialogActions>
                        <Button type='button' onClick={handleClose}>Cancel</Button>
                        <Button type="submit" form="subscription-form">
                            Next
                        </Button>
                    </DialogActions>
                </form>
                </DialogContent>
                </Dialog>
                </React.Fragment>
        </>
    )
}