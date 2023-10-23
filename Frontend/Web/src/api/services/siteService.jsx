import { apiClient } from "../axios/api";

//Get All Construction Sites
export const getAllConstructionSites = async () => {
    const response = await apiClient.get(`constructionsite`);
    return response.data;
  };

//Add Construction Site
export const addConstructionSite = async (
  siteName,
  location,
  threeshold,
  address,
  province,
  description,
  startDate,
  endDate,
  managerID
) => {
  const response = await apiClient.post(`constructionsite/addConstructionSite`, {
    ConstructionSiteDTO: {
      siteName: siteName,
      location: location,
      threeshold: threeshold,
      address: address,
      province: province,
      description: description,
      startDate: startDate,
      endDate: endDate,
      managerID: managerID,
    },
  });

  return response.data;
};


//Get Construction Site Manager By ID
export const getConstructionSiteManagerByID = async (id) => {
  const response = await apiClient.get(`user/getsitemanagerbyid/${id}`);
  return response.data;
};
  
//Get One Construction Site by ID
export const getOneConstructionSite = async (id) => {
    const response = await apiClient.get(`constructionsite/sitebyId/${id}`);
    return response.data;
  };

  //Get all Site Managers
  export const getAllSiteManagers = async () => {
    const response = await apiClient.get(`user/getallsitemanagers`);
    return response.data;
  };

  //Delete Construction Site
export const deleteConstructionSite = async (id) => {
    const response = await apiClient.delete(`constructionsite/deleteSite/${id}`);
    return response.data;
  };