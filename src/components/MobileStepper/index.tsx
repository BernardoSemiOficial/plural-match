import * as S from './mobileStepper.css'

interface MobileStepperProps {
  steps: number
  activeStep: number
}

export const MobileStepper = ({ steps, activeStep }: MobileStepperProps) => {
  const currentProgress = (activeStep / steps) * 100 + '%'

  return (
    <div className={S.container}>
      <div className={S.stepper}>
        <span className={S.progress} style={{ width: currentProgress }} />
      </div>
    </div>
  )
}
