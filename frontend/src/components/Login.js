import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import { useRef } from 'react'

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Pose Me
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const theme = createTheme()

export default function Login() {
  const navigate = useNavigate()

  const email = useRef(null)
  const password = useRef(null)

  function submitHandler(e){
      e.preventDefault();
  
      const register = {
        email: email.current.value,
        password: password.current.value
      };
  
      axios.post('http://localhost:8080/register', { register })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            TOHacks 2022 Pose Me 
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              inputRef={email}

            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              inputRef={password}

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{ navigate('/session')}}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}