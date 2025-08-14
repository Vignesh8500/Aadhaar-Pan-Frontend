
import './App.css'
import AadharValidation from './AadharValidation'
import StepperPages from './StepperPages'
import PanValidation from './PanValidation'
import * as React from "react";
import axios from 'axios';
import { Alert, Button, Box, Typography } from "@mui/material";

function App() {
  const steps = ['Aadhaar Validation','PAN Validation'];
  let[step,setStep] = React.useState(0);
  let [formData,setFormData] = React.useState({
    AadhaarNo:"",
    AadhaarName:"",
    organization:"",
    PanNo:"",
    PanName:"",
    DOB:null,
  });
  let [status, setStatus] = React.useState("idle"); 
  let [errorMessage, setErrorMessage] = React.useState("");
  let [isCompleted, setIsCompleted] = React.useState(false);
  function nextStep(){setStep((prev)=>prev + 1)};
  function prevStep(){setStep((prev)=>prev - 1)};
  async function handleFinalSubmit(){
    try{
      setStatus("loading");
      const modifiedData = {
        ...formData,
        DOB: formData.DOB ? formData.DOB.format("YYYY-MM-DD") : null
      };
      const res = await axios.post("http://localhost:8080/api/save-data",{data: modifiedData});
      console.log("Backend response:",res.data);
      setStatus("success");
      setStep(steps.length);
      setIsCompleted(true);
    }catch(err){
      console.error("error sending data: ",err);
      setErrorMessage(err.response?.data?.error || "Something went wrong!");
      setStatus("error");
    }
    prevStep();
    setFormData({AadhaarNo:"",
    AadhaarName:"",
    organization:"",
    PanNo:"",
    PanName:"",
    DOB:null,})
  }
  
  return (
    <>
      
      <StepperPages activeStepValue={isCompleted ? steps.length : step} steps={steps}/>
      <h3>UDAMY REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME</h3>

      {status === "success" && (
        <Box sx={{ p: 3 }}>
          <Alert severity="success">
             Aadhaar & PAN Data Saved Successfully!
          </Alert>
          <Button variant="contained" sx={{ mt: 2 }}  onClick={() => {
            setStep(0);
            setFormData({ AadhaarNo: "", PanNo: "", PanName: "", DOB: null });
            setStatus("idle");
          }}>
            Fill Again
          </Button>
        </Box>
      )}

      {status === "error" && (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
             Failed to save data: {errorMessage}
          </Alert>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => setStatus("idle")}>
            Try Again
          </Button>
        </Box>
      )}

      {status === "idle" && (
        <>
            {step === 0 && <AadharValidation formData={formData} setFormData={setFormData} onNext={nextStep}/>}
            {step === 1 && <PanValidation formData={formData} setFormData={setFormData} onPrev={prevStep} onSubmit={handleFinalSubmit}/>}
        </>
      )};
      
    </>
  )
}

export default App;
