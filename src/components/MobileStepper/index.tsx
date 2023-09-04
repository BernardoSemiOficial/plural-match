import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Button, MobileStepper as MobileStepperMUI } from '@mui/material'

interface MobileStepperProps {
  steps: number
  activeStep: number
  handleClickNext: () => void
  handleClickBack: () => void
}

export const MobileStepper = ({
  steps,
  activeStep,
  handleClickNext,
  handleClickBack,
}: MobileStepperProps) => {
  return (
    <MobileStepperMUI
      variant='progress'
      steps={steps}
      position='static'
      activeStep={activeStep}
      sx={{ flexGrow: 1, padding: '0' }}
      nextButton={
        <Button
          size='small'
          onClick={handleClickNext}
          disabled={activeStep === steps - 1}
        >
          Próximo
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button
          size='small'
          onClick={handleClickBack}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
          Voltar
        </Button>
      }
    />
  )
}
