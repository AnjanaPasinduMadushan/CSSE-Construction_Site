class ConstructionSiteDTO {
    constructor({
        siteName,
        location,
        threeshold,
        address,
        province,
        description,
        startDate,
        endDate,
        managerID,
    }) {
        this.siteName = siteName;
        this.location = location;
        this.threeshold = threeshold;
        this.address = address;
        this.province = province;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.managerID = managerID;
    }
}

export default ConstructionSiteDTO;
