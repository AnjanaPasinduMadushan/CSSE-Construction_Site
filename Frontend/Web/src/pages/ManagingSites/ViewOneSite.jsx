import { Box, InputLabel, Typography, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getConstructionSiteManagerByID, getOneConstructionSite } from '../../api/services/siteService';
import { useQuery } from "react-query";

function ViewOneSite() {
  const { id } = useParams();
  const [managerData, setManagerData] = useState(null);
  let decryptedId;
  if (id) {
    decryptedId = atob(id);
    console.log('Decrypted ID:', decryptedId);
  } else {
    toast.error('No ID available');
  }

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getOneConstructionSite(decryptedId),
  });

  useEffect(() => {
    if (data && data.managerID) {
      // Only run the second query if data and managerID are available
      getConstructionSiteManager();
    }
  }, [data]);

  const getConstructionSiteManager = () => {
    // Run the second query and update the state with the result
    getConstructionSiteManagerByID(data.managerID)
      .then((result) => setManagerData(result))
      .catch((error) => {
        toast?.error("Something went wrong")
      });
  };

  
  const handleButtonClick = () => {
    if (data?.location) {
      window.location.href = data.location;
    }
  };

  const formatStartDate = (startDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(startDate).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div>
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
          View Construction Site
        </Typography>
        <div
          style={{
            display: "flex"
          }}
        >
          <div
            style={{
              marginLeft: "5%",
              marginTop: "2%",
              width: "30vw",
            }}

          >
            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "1%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Site Name: {data?.siteName}
            </InputLabel>
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
              Threeshold: Rs.{data?.threeshold}
            </InputLabel>

            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "5%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Description:
            </InputLabel>
            <TextField
              id="outlined-multiline-flexible"
              // label="Description"
              multiline
              maxRows={4}
              value={data?.description}
              readonly
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
            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "10%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Assigned Site Manager: {managerData?.siteManager?.name}
            </InputLabel>
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
              Phone:  {managerData?.siteManager?.mobile}
            </InputLabel>
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
              Email: {managerData?.siteManager?.email}
            </InputLabel>



          </div>
          <div
            style={{
              marginLeft: "15%",
              // marginTop: "1%"
              width:"30vw"
            }}
          >    <Button
            variant="contained"
            sx={{
              backgroundColor: "#f4f3ff",
              borderRadius: "20px",
              color: "black",
              fontWeight: "bold",
              marginTop: "13%",
              marginLeft: "3%",
              width: "20vw",
              height: "5vh",
              fontSize: "20px"
            }}
            onClick={handleButtonClick}
          >
              View On Google Maps
            </Button>

            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "15%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
              Province: {data?.province}
            </InputLabel>

            <InputLabel
              sx={{
                marginLeft: "4%",
                marginTop: "6%",
                fontSize: "25px",
                fontWeight: "bold",
                color: "black"
                // padding: "30px",
              }}
            >
             Start Date: {data?.startDate ? formatStartDate(data.startDate) : 'N/A'}
            </InputLabel>
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
              End Date: {data?.startDate ? formatStartDate(data.endDate) : 'N/A'}
            </InputLabel>
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
              Address: 
            </InputLabel>
            <TextField
              id="outlined-multiline-flexible"
              // label="Description"
              multiline
              maxRows={4}
              value={data?.address}
              readonly
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
        </div>
      </Box>
    </div>
  )
}

export default ViewOneSite;