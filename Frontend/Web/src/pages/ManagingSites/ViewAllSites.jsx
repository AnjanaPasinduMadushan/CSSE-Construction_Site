import React, { useEffect, useState } from 'react'
import { useQuery } from "react-query";
import { deleteConstructionSite, getAllConstructionSites, getConstructionSiteManagerByID } from '../../api/services/siteService';
import { MaterialReactTable } from "material-react-table";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
function ViewAllSites() {
    const [managerNames, setManagerNames] = useState({});
    const { data, isLoading, error, isError } = useQuery({
        queryFn: () => getAllConstructionSites(),
    });

    // const handleGetSitManager = async (id) => {
    //     const response = await getConstructionSiteManagerByID(id);
    //     return response.siteManager.name;
    //   }

    useEffect(() => {
        if (data && data.length > 0) {
            const managerIDs = data.map((rowData) => rowData.managerID);
            const managerNamePromises = managerIDs.map((id) =>
                getConstructionSiteManagerByID(id)
            );

            Promise.all(managerNamePromises)
                .then((responses) => {
                    const names = {};
                    responses.forEach((response, index) => {
                        names[managerIDs[index]] = response.siteManager.name;
                    });
                    setManagerNames(names);
                })
                .catch((error) => {
                    console.error("Error fetching manager names:", error);
                });
        }
    }, [data]);

    const handleDelete = async (id) => {
        try {
            await deleteConstructionSite(id);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }

        console.log(id);
    }
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
    let mapDataWithActions;
    if (data != null) {
        mapDataWithActions = data?.map((rowData) => {
            // console.log(rowData)
            const formattedStartDate = new Date(rowData.startDate).toISOString().split('T')[0];
            const formattedEndDate = new Date(rowData.endDate).toISOString().split('T')[0];
            return {
                siteName: rowData.siteName,
                province: rowData.province,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                managerID: managerNames[rowData.managerID] || "Loading...",
                actions: (
                    <div>
                        <Button startIcon={<RemoveRedEyeIcon />} sx={{ borderRadius: "20px", color: "black" }} onClick={() => handleView(rowData)}></Button>
                        <Button startIcon={<EditIcon />} sx={{ borderRadius: "20px", color: "black", marginLeft: "2%" }} onClick={() => handleEdit(rowData)}></Button>
                        <Button startIcon={<DeleteIcon />} sx={{ borderRadius: "20px", color: "black", marginLeft: "2%" }} onClick={() => handleDelete(rowData?.siteID)}></Button>
                    </div>
                ),
            };
        });
    } else {
        mapDataWithActions = null;
    }


    return (
        <div>
            <h1 style={{ marginLeft: "8%", marginTop: "5%" }}>Manage All Sites</h1>
            <Button variant="contained" startIcon={<AddIcon />} style={{ marginLeft: "80%", marginTop: "2%", backgroundColor: "#A9A9A9", color: "black", borderRadius: "20px" }} href="/addSite">Add Construction Site</Button>
            <div style={{ width: "90vw", marginLeft: "7%", marginTop: "2%" }}>
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