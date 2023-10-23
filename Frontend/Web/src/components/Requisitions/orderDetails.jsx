import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Box, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const [requestedOrder, setRequestedOrders] = useState([]);
  const [requestedItems, setRequestedItems] = useState([]);
  const [constructionData, setConstructionData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get(`http://localhost:5050/orders/${id}`);
        setRequestedOrders(ordersRes.data.orders);

        const itemList = ordersRes.data.orders.items || [];
        const itemIds = itemList.map(item => item.itemId);

        const itemsRes = await axios.get('http://localhost:5050/orders/itemsOrdered', {
          params: { arrayIds: itemIds }
        });
        setRequestedItems(itemsRes.data.materials);
        console.log(ordersRes.data.orders.constructionSiteId)
        // const constructionRes = await axios.get(`http://localhost:5050/constructionsite/sitebyId/${ordersRes.data.orders.constructionSiteId}`);
        // setConstructionData(constructionRes.data.site);
        // console.log(constructionRes.data.site)
        const constructionRes = await axios.get(`http://localhost:5050/constructionsite/sitebyId/${ordersRes.data.orders.constructionSiteId}`);
        setConstructionData(constructionRes.data.site);
        console.log(constructionRes.data.site)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      <Box>
        <center><h2>Requisition Details</h2></center>
        <h3>Construction Site Name :</h3>
        <h3>Site Manager :</h3>

        <center><h3>Requisition Details</h3></center>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <table style={{ width: '800px', borderCollapse: 'collapse', margin: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: 'black', color: 'white' }}>
                <th style={{ border: '1px solid white', padding: '8px', textAlign: 'center', fontSize: '14px' }}>Product Name</th>
                <th style={{ border: '1px solid white', padding: '8px', textAlign: 'center', fontSize: '14px' }}>Quantity</th>
                <th style={{ border: '1px solid white', padding: '8px', textAlign: 'center', fontSize: '14px' }}>Price(Rs. )</th>
              </tr>
            </thead>
            <tbody>
              {requestedItems.map((order) => (
                <tr key={order.itemId} style={{ backgroundColor: '#f2f2f2' }}>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{order.name}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{order.quantity}</td>
                  <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginLeft: '20px', marginTop: '40px' }}>
            <h3 style={{ textAlign: 'right' }}>Total Price of order: </h3>
          </div>
        </div>

        <div style={{ marginLeft: '150px' }}>
          <h2>Management Staff Status</h2>
          <FormControl variant="outlined" style={{ marginRight: '40px', width: '200px' }}>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Status"
            >
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </Select>
          </FormControl>

          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Management Staff comments"
            style={{ width: '500px', marginRight: '20px' }}
            minRows={4}
          />

          <h2>Accountant Staff Status</h2>
          <FormControl variant="outlined" style={{ marginRight: '40px', width: '200px' }}>
            <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Status"
            >
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </Select>
          </FormControl>

          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Accountant Staff comments"
            style={{ width: '500px', marginRight: '20px' }}
            minRows={4}
          />
        </div>
        <br />
        <div>
          <Button style={{ marginLeft: '100px' }}>Back</Button>
          <Button style={{ marginLeft: '800px' }}>Submit</Button>
        </div>
      </Box>
    </div>
  );
}

export default OrderDetails;
