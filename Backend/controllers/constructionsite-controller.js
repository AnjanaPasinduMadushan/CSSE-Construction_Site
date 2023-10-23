import ConstructionSiteDTO from "../DTO/construction-siteDTO.js";
import ConstructionSite from "../models/construction-site/constructionsite-model.js";

// Create
const addConstructionSite = async (req, res) => {
    const { ConstructionSiteDTO } = req.body;

    console.log(req.body);

    try {
        let randomSiteID;
        let isUnique = false;

        // Keep generating random IDs until a unique one is found
        while (!isUnique) {
            randomSiteID = "S" + Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number

            // Check if the generated ID already exists in the database
            const existingSite = await ConstructionSite.findOne({
                siteID: randomSiteID,
            });

            if (!existingSite) {
                isUnique = true;
            }
        }

        console.log("ConstructionSiteDTO", ConstructionSiteDTO);

        const constructionsite = new ConstructionSite({
            siteID: randomSiteID,
            siteName: ConstructionSiteDTO.siteName,
            threeshold: ConstructionSiteDTO.threeshold,
            location: ConstructionSiteDTO.location,
            address: ConstructionSiteDTO.address,
            province: ConstructionSiteDTO.province,
            description: ConstructionSiteDTO.description,
            startDate: ConstructionSiteDTO.startDate,
            endDate: ConstructionSiteDTO.endDate,
            managerID: ConstructionSiteDTO.managerID,

        });

        await constructionsite.save();
        return res.status(201).json({ message: "Construction Site is Added", ConstructionSite: constructionsite });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in adding Construction Site" });
    }
};

// Update a managersite by siteId
const updateSiterBySiteId = async (req, res) => {
    try {
        const { siteId } = req.params;
        const {
            siteName,
            location,
            address,
            province,
            description,
            startDate,
            endDate,
            managerID,
        } = req.body;

        // Find the manager by managerId
        const existingSite = await ConstructionSite.findOne({ siteID: siteId });

        if (!existingSite) {
            return res.status(404).json({ message: "Site not found" });
        }

        // Check if another site with the same name exists (excluding the current site)
        const otherSiteWithSameName = await ConstructionSite.findOne({
            siteName,
            siteName: { $ne: existingSite.siteName } // Exclude the current siteName
        });

        if (otherSiteWithSameName) {
            return res.status(409).json({ message: "Another Site already exists with this name" });
        }

        // Update site details
        existingSite.siteName = siteName;
        existingSite.location = location;
        existingSite.address = address;
        existingSite.province = province;
        existingSite.description = description;
        existingSite.startDate = startDate;
        existingSite.endDate = endDate;
        existingSite.managerID = managerID;

        // Save the updated site
        await existingSite.save();

        return res.status(200).json({ message: "Site updated successfully", ConstructionSite: existingSite });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in updating Site" });
    }
};

// Delete a construction site by construction siteId
const deleteConstructionSite = async (req, res) => {
    try {
        const { siteId } = req.params; // Use req.params to get the id parameter from the URL

        // Attempt to delete the site by siteId
        const result = await ConstructionSite.deleteOne({ siteID: siteId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Site not found" });
        }

        return res.status(200).json({ message: "Site deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in deleting Site" });
    }
};

// Get one site by siteId
const getSiteBySiteId = async (req, res) => {
    try {
        const { siteId } = req.params;

        // Find the site by siteId
        const site = await ConstructionSite.findOne({ siteID: siteId });

        if (!site) {
            return res.status(404).json({ message: "Site not found" });
        }

        return res.status(200).json(site);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in fetching Site" });
    }
};

// Get all sites
const getAllSites = async (req, res) => {
    try {
        // Find all sites
        const sites = await ConstructionSite.find();

        return res.status(200).json(sites);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in fetching Sites" });
    }
};

const getSitesByManagerId = async (req, res) => {
    try {
        const { managerId } = req.params;

        // Use findOne to find a single site with the given managerID
        const site = await ConstructionSite.find({ managerID: managerId });

        if (!site) {
            // Return a 404 response if the site is not found
            return res.status(404).json({ message: "Site not found" });
        }

        // Return a 200 response with the site data
        return res.status(200).json(site);
    } catch (err) {
        console.error(err);
        // Return a 500 response for any unexpected errors
        return res.status(500).json({ message: "Error occurred in fetching Site" });
    }
};


const getSiteCountsByProvince = async () => {
    try {
        // Find all sites
        const sites = await ConstructionSite.find();

        if (!sites || sites.length === 0) {
            return { error: "No sites found" };
        }

        // Group sites by province and year of endDate
        const siteCountsByProvinceAndYear = {};
        sites.forEach((site) => {
            const endDateParts = site.endDate.split('/');
            if (endDateParts.length === 3) {
                const year = endDateParts[2]; // Extract the year from endDate
                const key = `${site.province}_${year}`;
                if (siteCountsByProvinceAndYear[key]) {
                    siteCountsByProvinceAndYear[key]++;
                } else {
                    siteCountsByProvinceAndYear[key] = 1;
                }
            }
        });

        // Convert the grouped data into an array of objects with province and count
        const resultArray = Object.entries(siteCountsByProvinceAndYear).map(([key, count]) => {
            const [province, year] = key.split('_');
            return {
                province,
                year,
                count,
            };
        });

        return resultArray;
    } catch (err) {
        console.error(err);
        return { error: "Error occurred in fetching Sites" };
    }
};

export { addConstructionSite, updateSiterBySiteId, deleteConstructionSite, getSiteBySiteId, getAllSites, getSitesByManagerId, getSiteCountsByProvince };