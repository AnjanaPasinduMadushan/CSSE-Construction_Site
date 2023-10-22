import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const defaultTheme = createTheme();

export default function CreateAcc() {

  const navigate = useNavigate();

  const [inputs, setInputs] = React.useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    role: ""
  })

  const handleChange = async (e) => {
    setInputs((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(inputs);
    try {
      const res = await axios.post('http://localhost:5050/user/signUp', {
        name: inputs.name,
        mobile: inputs.mobile,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role
      });
      console.log(res.data.message)
      const data = await res.data;
      console.log(data);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Creation
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={inputs.name}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={inputs.email}
                  onChange={handleChange}
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  value={inputs.mobile}
                  onChange={handleChange}
                  name="mobile"
                  autoComplete="mobile"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={inputs.password}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select-label"
                    value={inputs.role}
                    label="Role"
                    onChange={handleChange}
                    name="role"
                  >
                    <MenuItem value={10}>Accountant</MenuItem>
                    <MenuItem value={20}>Site Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}