import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Button, InputLabel, TextField, Typography } from '@mui/material';
import "../../CSS/add_construction_site.css"
import { addConstructionSite, getAllSiteManagers } from '../../api/services/siteService';
import { useQuery } from "react-query";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

function AddSiteForm() {

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllSiteManagers(),
  });


  const [siteName, setsiteName] = useState('');
  const [siteManager, setsiteManager] = useState('');
  const [threshold, setThreshold] = useState('');
  const [description, setDescription] = useState('');
  const [googleMap, setgoogleMaps] = useState('');
  const [province, setProvince] = useState('');
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [address, setAddress] = useState('');


  const validationSchema = Yup.object().shape({
    siteName: Yup.string().required('Site Name is required'),
    siteManager: Yup.string().required('Site Manager is required'),
    threshold: Yup.number().required('Threshold is required').positive('Threshold must be positive'),
    description: Yup.string().required('Description is required'),
    googleMap: Yup.string().required('Google Map Link is required'),
    province: Yup.string().required('Province is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date()
      .required('End Date is required')
      .when('startDate', (startDate, schema) => {
        return schema.min(startDate, 'End Date must be after Start Date');
      }),
    address: Yup.string().required('Address is required'),
  });

  const handleSiteSubmit = async (e) => {
    e.preventDefault();
    try {

      await validationSchema.validate(
        {
          siteName,
          siteManager,
          threshold,
          description,
          googleMap,
          province,
          startDate,
          endDate,
          address,
        },
        { abortEarly: false } // Collect all validation errors
      );

      const response = await addConstructionSite(
        siteName,
        googleMap,
        threshold,
        address,
        province,
        description,
        startDate,
        endDate,
        siteManager
      ).then((response) => {
        console.log(response);
        toast.success("Construction Site Added Successfully");
        setsiteName("");
        setsiteManager("");
        setThreshold("");
        setDescription("");
        setgoogleMaps("");
        setProvince("");
        setstartDate("");
        setendDate("");
        setAddress("");
      });
    } catch (error) {
        if (error.errors) {
        // Handle Yup validation errors
        error.errors.forEach((errorMsg) => {
          toast.error(errorMsg);
        });
      } else if (error.response) {
        toast.error('Sorry, an error occurred');
      } else {
        console.log(error);
      }
    }

  };




  const handleThresholdChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/[^0-9]/g, '');
    setThreshold(numericInput);
  };

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: '#c2c2c2',
          marginLeft: "8%",
          marginTop: "7%",
          width: "87vw",
          height: "80vh",
          borderRadius: "10px",
          marginBottom: "5%",
        }}
      >
        <Typography
          sx={{
            // marginLeft: "2%",
            marginTop: "5%",
            fontSize: "30px",
            fontWeight: "bold",
            padding: "30px",
          }}
        >
          Add Construction Sites
        </Typography>
        <div
          style={{
            display: "flex"
          }}
        >
          <div
            style={{
              marginLeft: "5%",
              // marginTop: "5%",
            }}

          >

            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "2%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Site Name
            </InputLabel>
            <TextField
              id="outlined-basic" label="Site Name" variant="outlined"
              sx={{
                backgroundColor: "#fafafa",
                marginLeft: "4%",
                marginTop: "2%",
                width: "30vw",
                borderRadius: "20px",
                input: {
                  border: "none !important", // Add !important
                  outline: "none !important", // Add !important
                },
              }}
              InputProps={{
                style: {
                  border: "none",
                  outline: "none",
                },
              }}
              value={siteName}
              onChange={(e) => setsiteName(e.target.value)}
            >

            </TextField>
            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "2%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Site Manager
            </InputLabel>
            <Select
              sx={{
                backgroundColor: "#fafafa",
                marginLeft: "4%",
                marginTop: "2%",
                width: "30vw",
                borderRadius: "20px",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={siteManager}
              onChange={(e) => setsiteManager(e.target.value)}
            >
              {isLoading ? (
                <MenuItem value="">Loading...</MenuItem>
              ) : isError ? (
                <MenuItem value="">Error loading data</MenuItem>
              ) : (
                data?.siteManagers?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))
              )}
            </Select>
            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "2%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Enter Threeshold (Rs.)
            </InputLabel>
            <TextField
              id="outlined-basic"
              label="Threeshold"
              variant="outlined"
              value={threshold}
              onChange={handleThresholdChange}
              sx={{
                backgroundColor: "#fafafa",
                marginLeft: "4%",
                marginTop: "2%",
                width: "30vw",
                borderRadius: "20px",
                input: {
                  border: "none !important", // Add !important
                  outline: "none !important", // Add !important
                },
              }}
              InputProps={{
                style: {
                  border: "none",
                  outline: "none",
                },
                inputProps: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}

            >

            </TextField>

            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "2%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Description
            </InputLabel>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                backgroundColor: "#fafafa",
                marginLeft: "4%",
                marginTop: "2%",
                width: "30vw",
                height: "20vh",
                borderRadius: "20px",
                input: {
                  border: "none !important",
                  outline: "none !important",
                },
              }}
              InputProps={{
                style: {
                  border: "none",
                  outline: "none",
                },
              }}
            >

            </TextField>
          </div>
          <div
            style={{
              marginLeft: "15%",
              // marginTop: "1%"
            }}
          >
            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "2%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Location Google Maps (G-Maps)
            </InputLabel>
            <TextField
              id="outlined-basic" label="Google Gmap Link" variant="outlined"
              value={googleMap}
              onChange={(e) => setgoogleMaps(e.target.value)}
              sx={{
                backgroundColor: "#fafafa",
                marginLeft: "4%",
                marginTop: "2%",
                width: "33vw",
                borderRadius: "20px",
                input: {
                  border: "none !important", // Add !important
                  outline: "none !important", // Add !important
                },
              }}
              InputProps={{
                style: {
                  border: "none",
                  outline: "none",
                },
              }}
            >

            </TextField>
            <div
              style={{
                display: "flex"
              }}
            >
              <div
                style={{
                  marginTop: "4%",
                  marginLeft: "4%",
                }}
              >
                <InputLabel
                  sx={{
                    // marginLeft: "4%",
                    // marginTop: "2%",
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "black"
                    // padding: "30px",
                  }}
                >
                  Province
                </InputLabel>
                <Select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  sx={{
                    backgroundColor: "#fafafa",
                    marginLeft: "4%",
                    marginTop: "2%",
                    width: "10vw",
                    borderRadius: "20px",
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Province"
                >
                  <MenuItem value={"Northern"}>Northern</MenuItem>
                  <MenuItem value={"North Western"}>North Western	</MenuItem>
                  <MenuItem value={"Western"}>Western	</MenuItem>
                  <MenuItem value={"North Central	"}>North Central		</MenuItem>
                  <MenuItem value={"Central"}>Central	</MenuItem>
                  <MenuItem value={"Sabaragamuwa"}>Sabaragamuwa	</MenuItem>
                  <MenuItem value={"Eastern	"}>Eastern		</MenuItem>
                  <MenuItem value={"Uva	"}>Uva		</MenuItem>
                  <MenuItem value={"Southern"}>Southern	</MenuItem>

                </Select>
              </div>
              <div
                style={{
                  marginTop: "4%",
                  marginLeft: "4%",
                }}
              >
                <InputLabel
                  sx={{
                    // marginLeft: "4%",
                    // marginTop: "2%",
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "black"
                    // padding: "30px",
                  }}
                >
                  Start Date
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(e) => setstartDate(e.target.value)}
                    sx={{
                      backgroundColor: "#fafafa",
                      width: "10vw",
                      borderRadius: "20px",
                    }}
                    label="Start Date" />
                </LocalizationProvider>
              </div>
              <div
                style={{
                  marginTop: "4%",
                  marginLeft: "4%",
                }}
              >
                <InputLabel
                  sx={{
                    // marginLeft: "4%",
                    // marginTop: "2%",
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "black"
                    // padding: "30px",
                  }}
                >
                  End Date
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(e) => setendDate(e.target.value)}
                    sx={{
                      backgroundColor: "#fafafa",
                      width: "10vw",
                      borderRadius: "20px",
                    }}
                    label="End Date" />
                </LocalizationProvider>
              </div>
            </div>
            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "2%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Address
            </InputLabel>
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              maxRows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{
                backgroundColor: "#fafafa",
                marginLeft: "4%",
                marginTop: "2%",
                width: "33vw",
                height: "10vh",
                borderRadius: "20px",
                input: {
                  border: "none !important",
                  outline: "none !important",
                },
              }}
              InputProps={{
                style: {
                  border: "none",
                  outline: "none",
                },
              }}
            >

            </TextField>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ffcf33",
                borderRadius: "20px",
                color: "black",
                fontWeight: "bold",
                marginTop: "13%",
                marginLeft: "20%",
                width: "20vw",
                height: "5vh",
                fontSize: "20px"
              }}
              onClick={handleSiteSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </Box>
    </>
  )
}

export default AddSiteForm