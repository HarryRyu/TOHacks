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


  
  const theme = createTheme()
  
  export default function Register(){
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
                TOHacks Registration
            </Typography>
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    inputRef={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    inputRef={password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }
  