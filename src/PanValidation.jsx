import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

export default function PanValidation({formData, setFormData, onPrev, onSubmit}){
    let styles = {
        width: "100%",
        border: "2px solid black",
    
    }
    let formStyle = {
        textAlign: 'center',
    }
    const today = dayjs();
    const eighteenYearsAgo = today.subtract(18, 'year');
    const minDate = today.subtract(100, 'year');
    
    function inputhandler(event){
        let{name,value} = event.target;
        if (name === "PanNo") {
            const panvalue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 10);;
            setFormData((curr) => ({ ...curr, [name]: panvalue }));
        } else {
            setFormData((curr) => ({ ...curr, [name]: value }));
        }
    }
    function submitForm(event){
        event.preventDefault();
        onSubmit();
        
        setFormData({organization:'',PanNo:'',PanName:'',DOB:null});
    }
    
    
    return(
        <>
           <div style={styles}>
            <h4 style={{backgroundColor: '#01579b',color: 'white',marginTop:'0px',padding: '0.5rem'}}>PAN Validation</h4>
             <form>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                <InputLabel id="demo-simple-select-standard-label">Type of Organization</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formData.organization}
                onChange={inputhandler}
                label="organization"
                name="organization"
                required
                >
                <MenuItem value={"Individual"}>
                    <em>Individual</em>
                </MenuItem>
                <MenuItem value={"company"}>Company</MenuItem>
                <MenuItem value={"HUF"}>Hindu Undivided Family (HUF)</MenuItem>
                <MenuItem value={"AOP"}>Association of Persons (AOP)</MenuItem>
                <MenuItem value={"BOI"}>Body of Individuals(BOI)</MenuItem>
                <MenuItem value={"Government Agency"}>Government Agency</MenuItem>
                <MenuItem value={"Artifical Juridical Person"}>Artifical Juridical Person</MenuItem>
                <MenuItem value={"Local Authority"}>Local Authority</MenuItem>
                <MenuItem value={"Firm/partnership"}>Firm/Partnership</MenuItem>
                <MenuItem value={"Trust"}>Trust</MenuItem>
                </Select>
      </FormControl>
            <div style={formStyle}>
                        <TextField  name='PanNo' id="PanNO" label="1. PAN Number" variant="standard" placeholder='Your PAN number'  margin='normal'type='text' value={formData.PanNo} required error={(formData.PanNo || "").length > 0 && (formData.PanNo || "").length !== 10}
                        helperText={
                            (formData.PanNo || "").length > 0 && (formData.PanNo || "").length !== 10
                            ? "PAN number must be exactly 10 digits": ""
                        } onChange={inputhandler} />&nbsp;&nbsp;&nbsp;&nbsp;
                    
                        <TextField disabled name='PanName' id="PanName" label="2. Name" variant="standard" placeholder='Name as per PAN' margin='normal' type='text' value={formData.AadhaarName} required onChange={inputhandler}/><br/>
                    </div> 
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateCalendar']}>
                        <DatePicker 
                            label="Date of Birth" disableFuture maxDate={eighteenYearsAgo}  minDate={minDate} name='DOB'  onChange={(newValue) =>setFormData((prev) => ({...prev,DOB: newValue}))}/>
                    </DemoContainer>
                    </LocalizationProvider>
                    <p>Selected DOB:{' '} {formData.DOB ? formData.DOB.format('YYYY-MM-DD') : 'None'}</p>
                <Button type='button' variant="outlined" style={{margin: '1rem'}} onClick={onPrev}>Back</Button>
                <Button type='submit' variant="contained" style={{margin: '1rem'}} onClick={submitForm}>Submit</Button>
             </form>
             
           </div>
        </>
    )
}