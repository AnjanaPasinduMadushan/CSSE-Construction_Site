import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewRequisitions() {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5050/orders/requested');
        setOrders(res.data.orders);
        console.log(res.data.orders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    getOrders();
  }, []);

  const navigateToViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Ref No</StyledTableCell>
            <StyledTableCell align="center">Construction Site Name</StyledTableCell>
            <StyledTableCell align="center">Accountant Approval Status</StyledTableCell>
            <StyledTableCell align="center">Management Approval Status</StyledTableCell>
            <StyledTableCell align="center">View Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.oId}>
              <StyledTableCell align="center">{order.refNo === null ? 'Approval Needed' : order.refNo}</StyledTableCell>
              <StyledTableCell align="center">{order.constructionSiteName}</StyledTableCell>
              <StyledTableCell align="center">{order.accountantStatus}</StyledTableCell>
              <StyledTableCell align="center">{order.managementStatus}</StyledTableCell>
              <StyledTableCell align="center"><Button onClick={() => navigateToViewDetails(order._id)}>View Order Details</Button></StyledTableCell>
              {/* Add a button or link for View Details here */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
