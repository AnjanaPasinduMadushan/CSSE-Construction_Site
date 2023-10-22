import ManagerDTO from "../DTO/managerDTO.js";
import Manager from "../models/manager/manager-model.js";
const addManager = async (req, res) => {
    const { ManagerDTO } = req.body;

    console.log(req.body);

    try {
        let randomManagerID;
        let isUnique = false;

        // Check if the email already exists in the database
        const existingManagerbyEmail = await Manager.findOne({
            managerEmail: ManagerDTO.managerEmail,
        });

        if (existingManagerbyEmail) {
            return res.status(409).json({ message: "A Manager already with this email" })
        }

        // Keep generating random IDs until a unique one is found
        while (!isUnique) {
            randomManagerID = "M" + Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number

            // Check if the generated ID already exists in the database
            const existingManager = await Manager.findOne({
                managerID: randomManagerID,
            });

            if (!existingManager) {
                isUnique = true;
            }
        }

        console.log("ManagerDTO", ManagerDTO);

        const manager = new Manager({
            managerID: randomManagerID,
            managerName: ManagerDTO.managerName,
            managerEmail: ManagerDTO.managerEmail,
            managerPhone: ManagerDTO.managerPhone,
            userId: ManagerDTO.userId,
        });

        await manager.save();
        return res.status(201).json({ message: "Manager is Added", Manager: manager });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in adding Manager" });
    }
};

// Update a manager by managerId
const updateManagerByManagerId = async (req, res) => {
    try {
        const { managerId } = req.params;
        const { managerEmail, managerName, managerPhone } = req.body;
        console.log(managerId)
        // Find the manager by managerId
        const existingManager = await Manager.findOne({ managerID: managerId });

        if (!existingManager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        // Check if another manager with the same email exists (excluding the current manager)
        const otherManagerWithSameEmail = await Manager.findOne({
            managerEmail,
            managerID: { $ne: existingManager.managerID } // Exclude the current manager by managerID
        });

        if (otherManagerWithSameEmail) {
            return res.status(409).json({ message: "Another Manager already exists with this email" });
        }

        // Update manager details
        existingManager.managerName = managerName;
        existingManager.managerPhone = managerPhone;
        existingManager.managerEmail = managerEmail;

        // Save the updated manager
        await existingManager.save();

        return res.status(200).json({ message: "Manager updated successfully", Manager: existingManager });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in updating Manager" });
    }
};


// Delete a manager by  managerId
const deleteManager = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to get the id parameter from the URL

        // Attempt to delete the manager by managerId
        const result = await Manager.deleteOne({ managerID: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Manager not found" });
        }

        return res.status(200).json({ message: "Manager deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in deleting Manager" });
    }
};
// Get one manager by managerId
const getManagerByManagerId = async (req, res) => {
    try {
        const { managerId } = req.params;

        // Find the manager by managerId
        const manager = await Manager.findOne({ managerID: managerId });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        return res.status(200).json(manager);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in fetching Manager" });
    }
};

// Get all managers
const getAllManagers = async (req, res) => {
    try {
        // Find all managers
        const managers = await Manager.find();

        return res.status(200).json(managers);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in fetching Managers" });
    }
};

// Get one manager by userId
const getManagerByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the manager by userId
        const manager = await Manager.findOne({ userId });

        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        return res.status(200).json(manager);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Error occurred in fetching Manager by userId" });
    }
};

const getAllManagerIds = async () => {
    try {
        const managerIds = await Manager.find({}, 'managerID');
        console.log(managerIds)
        return managerIds;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { addManager, updateManagerByManagerId, deleteManager, getManagerByManagerId, getAllManagers, getManagerByUserId, getAllManagerIds };

