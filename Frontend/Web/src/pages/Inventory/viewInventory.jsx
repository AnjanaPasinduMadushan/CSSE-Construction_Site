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
import { Button, Typography } from '@mui/material';

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

export default function ViewInventory() {

  const [inventory, setInventory] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/material/get');
        setInventory(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Error fetching Inventory:', err);
      }
    };

    getOrders();
  }, []);

  const changeOrderStatus = async (id, currentStatus) => {
    try {
      console.log(id);
      const newStatus = currentStatus === 'restricted' ? false : true;
      console.log(newStatus);
      const res = await axios.patch(`http://localhost:5050/api/material/updateStatusMaterial/${id}`, {
        isRestriced: newStatus,
      });
      setInventory((prevInventory) =>
        prevInventory.map((material) =>
          material._id === id ? { ...material, isRestricted: newStatus } : material
        )
      );
      console.log(res.data);
    } catch (err) {
      console.error('Error patching order status:', err);
    }
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Item Name</StyledTableCell>
              <StyledTableCell align="center">Item Price</StyledTableCell>
              <StyledTableCell align="center">Item Brand</StyledTableCell>
              <StyledTableCell align="center">Restricted Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((inventory) => (
              <StyledTableRow key={inventory.oId}>
                <StyledTableCell align="center">{inventory.name}</StyledTableCell>
                <StyledTableCell align="center">{inventory.price}</StyledTableCell>
                <StyledTableCell align="center">{inventory.brand}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => changeOrderStatus(inventory._id, inventory.isRestriced ? 'restricted' : 'not restricted')}
                    style={{ backgroundColor: inventory.isRestriced ? 'red' : 'green', color: 'white' }}>
                    {inventory.isRestriced ? 'Restricted' : 'Not Restricted'}
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
