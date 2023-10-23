import React from 'react'
import { useQuery } from "react-query";
import { deleteConstructionSite, getAllConstructionSites } from '../../api/services/siteService';
import { MaterialReactTable } from "material-react-table";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
function ViewAllSites() {

    const { data, isLoading, error, isError } = useQuery({
        queryFn: () => getAllConstructionSites(),
    });

    const columns = [
        {
            header: "Site Name",
            accessorKey: "siteName",
        },
        {
            header: "Province",
            accessorKey: "province",
        },
        {
            header: "Start Date",
            accessorKey: "startDate",
        },
        {
            header: "End Date",
            accessorKey: "endDate",
        },
        {
            header: "Assigned Site Manager",
            accessorKey: "managerID",
        },
        {
            header: "Actions",
            accessorKey: "actions",
        },
    ];

    const mapDataWithActions = data?.map((rowData) => {
        console.log(rowData)
        return {
            siteName: rowData.siteName,
            province: rowData.province,
            startDate: rowData.startDate,
            endDate: rowData.endDate,
            managerID: rowData.managerID,
            actions: (
                <div>
                    <Button startIcon={<RemoveRedEyeIcon/>} sx={{borderRadius:"20px",backgroundColor:"#A9A9A9", color:"black"}} onClick={() => handleView(rowData)}>View</Button>
                    <Button startIcon={<EditIcon/>} sx={{borderRadius:"20px",backgroundColor:"#A9A9A9", color:"black", marginLeft:"2%"}} onClick={() => handleEdit(rowData)}>Edit</Button>
                    <Button startIcon={<DeleteIcon/>} sx={{borderRadius:"20px",backgroundColor:"#A9A9A9", color:"black", marginLeft:"2%"}} onClick={() => handleDelete(rowData?._id)}>Delete</Button>
                </div>
            ),
        };
    });

    const handleDelete = async (id) => {
try{
        await deleteConstructionSite(id);
        window.location.reload();
    }
    catch(error){
        console.log(error);
    }
        
        console.log(id);
    }

    return (
        <div>
            <h1 style={{ marginLeft: "8%", marginTop: "5%" }}>Manage All Sites</h1>
            <Button variant="contained" startIcon={<AddIcon/>} style={{ marginLeft: "80%", marginTop: "2%", backgroundColor: "#A9A9A9", color: "black", borderRadius: "20px" }} href="/addSite">Add Construction Site</Button>
            <div style={{ width: "95vw", marginLeft: "4%", marginTop: "2%" }}>
                {data ? (
                    <MaterialReactTable columns={columns} data={mapDataWithActions} />
                ) : (
                    <p>Sorry No Data Avaialable</p>
                )}
            </div>
        </div>
    )
}

export default ViewAllSites