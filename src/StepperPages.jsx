import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
export default function StepperPages({activeStepValue, steps}){
    

    return(
        <>
            <div style={{width: "100%"}}>
                <Stepper activeStep={activeStepValue} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </div>
        </>
    )
}
