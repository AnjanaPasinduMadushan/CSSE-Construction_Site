import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextareaAutosize, Box, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const [requestedOrder, setRequestedOrders] = useState([]);
  const [requestedItems, setRequestedItems] = useState([]);
  const [constructionData, setConstructionData] = useState([]);
  const [managerData, setManagerData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await axios.get(`http://localhost:5050/orders/${id}`);
        setRequestedOrders(ordersRes.data.orders);
        console.log(ordersRes.data.orders);
        const itemList = ordersRes.data.orders.items || [];
        const itemIds = itemList.map(item => item.itemId);

        const itemsRes = await axios.get('http://localhost:5050/orders/itemsOrdered', {
          params: { arrayIds: itemIds }
        });
        setRequestedItems(itemsRes.data.materials);
        console.log(ordersRes.data.orders.constructionSiteName);
        let constructionRes;
        if (ordersRes.data.orders.constructionSiteName === undefined || ordersRes.data.orders.constructionSiteId) {
          constructionRes = await axios.get(`http://localhost:5050/constructionsite/sitebyObjectId/${ordersRes.data.orders.constructionSiteId}`);
          setConstructionData(constructionRes.data.site);
          console.log(constructionRes.data.site.managerID);
        }
        console.log(constructionRes.data.site.managerID)
        const managerRes = await axios.get(`http://localhost:5050/user/getsitemanagerbyid/${constructionRes.data.site.managerID}`);
        setManagerData(managerRes.data.siteManager);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const [managementStatus, setManagementStatus] = useState({
    status: requestedOrder.managementStatus || "",
    comments: requestedOrder.managementComments || "",
  });

  const [accountantStatus, setAccountantStatus] = useState({
    status: requestedOrder.accountantStatus || "",
    comments: requestedOrder.accountantComments || "",
  });


  const changeManagementStatus = async () => {
    try {
      console.log(id);
      console.log(managementStatus.status);

      const res = await axios.patch(`http://localhost:5050/orders/ManagementStatus/${id}`, {
        status: managementStatus.status,
        comments: managementStatus.comments,
      });

      console.log(res.data);

      //the response contains the updated order details
      const updatedOrderDetails = res.data.order;
      console.log(updatedOrderDetails)

      // Update the local state with the new values
      setRequestedOrders(updatedOrderDetails);

    } catch (err) {
      console.error('Error patching order status:', err);
    }
  };


  const changeAccountantStatus = async () => {
    try {
      console.log(id);
      console.log(accountantStatus.status);

      const res = await axios.patch(`http://localhost:5050/orders/AccountantStatus/${id}`, {
        status: accountantStatus.status,
        comments: accountantStatus.comments,
      });

      console.log(res.data);

      //the response contains the updated order details
      const updatedOrderDetails = res.data.order;
      console.log(updatedOrderDetails)

      // Update the local state with the new values
      setRequestedOrders(updatedOrderDetails);

    } catch (err) {
      console.error('Error patching order status:', err);
    }
  };

  return (
    <div>
      <Box>
        <center><h2>Requisition Details</h2></center>
        <h3>Construction Site Name :{requestedOrder.constructionSiteName ? requestedOrder.constructionSiteName : constructionData.siteName}</h3>
        <h3>Site Manager :{managerData.name}</h3>

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
            <h3 style={{ textAlign: 'right' }}>Treshold for this site: Rs. {constructionData.threeshold}</h3>
            <h3 style={{ textAlign: 'right' }}>Total Price of order: Rs. {requestedOrder.totalPrice}</h3>
          </div>
        </div>

        <div style={{ marginLeft: '150px' }}>
          <h2>Management Staff Status</h2>
          <FormControl variant="outlined" style={{ marginRight: '40px', width: '200px' }}>
            <InputLabel id="demo-simple-select-outlined-label">{requestedOrder.managementStatus}</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={requestedOrder.managementComments}
              onChange={(e) => setManagementStatus({ ...managementStatus, status: e.target.value })}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Management Staff comments"
            style={{ width: '500px', marginRight: '20px' }}
            minRows={4}
            onChange={(e) => setManagementStatus({ ...managementStatus, comments: e.target.value })}
          />
          <Button style={{ marginLeft: '800px' }} onClick={changeManagementStatus}>Submit</Button>

          <h2>Accountant Staff Status</h2>
          <FormControl variant="outlined" style={{ marginRight: '40px', width: '200px' }}>
            <InputLabel id="demo-simple-select-outlined-label">{requestedOrder.accountantStatus}</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => setAccountantStatus({ ...accountantStatus, status: e.target.value })}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>


          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Accountant Staff comments"
            style={{ width: '500px', marginRight: '20px' }}
            minRows={4}
            onChange={(e) => setAccountantStatus({ ...accountantStatus, comments: e.target.value })}
          />
          <Button style={{ marginLeft: '800px' }} onClick={changeAccountantStatus}>Submit</Button>
        </div>
        <br />
        <div>
          <Button style={{ marginLeft: '100px' }}>Back</Button>
        </div>
      </Box>
    </div>
  );
}

export default OrderDetails;
