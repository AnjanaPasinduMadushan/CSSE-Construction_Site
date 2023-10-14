class ConstructionSiteDTO {
    constructor({
        siteName,
        location,
        address,
        province,
        description,
        startDate,
        endDate,
        managerID,
    }) {
        this.siteName = siteName;
        this.location = location;
        this.address = address;
        this.province = province;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.managerID = managerID;
    }
}

export default ConstructionSiteDTO;
