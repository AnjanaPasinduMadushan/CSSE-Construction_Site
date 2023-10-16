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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function ViewRequisitions() {

  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5050/orders/');
        if (res.data && res.data.order) {
          setOrders(res.data.order);
          console.log(res.data.order);
        } else {
          console.error('Invalid response format:', res.data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    getOrders();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="right">Ref No</StyledTableCell>
            <StyledTableCell align="right">Construction Site Name</StyledTableCell>
            <StyledTableCell align="right">Accountant Approval Status</StyledTableCell>
            <StyledTableCell align="right">Management Approval Status</StyledTableCell>
            <StyledTableCell align="right">View Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order.oId}>
              <StyledTableCell component="th" scope="row">
                {order.oId}
              </StyledTableCell>
              <StyledTableCell align="right">{order.refNo}</StyledTableCell>
              <StyledTableCell align="right">{order.constructionSiteName}</StyledTableCell>
              <StyledTableCell align="right">{order.accountantStatus}</StyledTableCell>
              <StyledTableCell align="right">{order.managementStatus}</StyledTableCell>
              <StyledTableCell align="right"><Button>View Order Details</Button></StyledTableCell>
              {/* Add a button or link for View Details here */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
