import { Alert, Box } from '@mui/material'

export const PasswordRules = () => {
  return (
    <Box mt={3}>
      <Alert severity='info'>
        A senha deve conter a seguintes regras: <br />
        * Mínimo de 8 caracteres <br />
        * 1 letra maiúscula <br />
        * 1 letra minúscula <br />
        * 1 caractere numérico <br />* 1 caractere especial
      </Alert>
    </Box>
  )
}
