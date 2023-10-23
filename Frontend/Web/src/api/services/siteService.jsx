import { apiClient } from "../axios/api";

//Get All Construction Sites
export const getAllConstructionSites = async () => {
    const response = await apiClient.get(`constructionsite`);
    return response.data;
  };
  

  //Delete Construction Site
export const deleteConstructionSite = async (id) => {
    const response = await apiClient.delete(`constructionsite/deleteSite/${id}`);
    return response.data;
  };