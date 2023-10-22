import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'; 

const AddMaterial =() => {

    const [inputs, setInputs] = useState({
        name: "",
        price: "",
        quantity: "",
        brand: "",
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((previousState) => ({
          ...previousState,
          [name]: value,
        }));
      };
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(inputs)
        try {
            const res = await axios.post('http://localhost:5050/api/material/add', {
                name: inputs.name,
                price: inputs.price,
                quantity: inputs.quantity,
                brand: inputs.brand,
            });
            const data = await res.data;
            console.log(data);
        }catch (err) {
            console.log(err)
        }
    }






  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}  onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Name"
          id="outlined-start-adornment"
          onChange={handleChange}
          sx={{ m: 1, width: '50%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          label="Price"
          id="outlined-start-adornment"
          onChange={handleChange}
          sx={{ m: 1, width: '50%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
          }}
        />
        <TextField
          label="Brand"
          id="outlined-start-adornment"
          onChange={handleChange}
          sx={{ m: 1, width: '50%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />
        <TextField
          label="Quantity"
          id="outlined-start-adornment"
          onChange={handleChange}
          sx={{ m: 1, width: '50%' }}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
        />   

        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{  m: 2
                    , width: '50%' }}
              >Update</Button>    
      </div>
      
    </Box>
  );
}
export default AddMaterial;
