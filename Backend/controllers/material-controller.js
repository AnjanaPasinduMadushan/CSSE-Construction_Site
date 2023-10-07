import Material from "../models/material/material-model.js";

const getAllMaterials = async (req, res, next) => {
    let material;
    try {
    material = await Material.find();
    } catch (err) {
      console.log(err);
    }
    if (!material) {
      return res.status(404).json({ message: "Nothing found" });
    }
    return res.status(200).json( material);
  };
  
  const getById = async (req, res, next) => {
    const id = req.params.id;
    let material;
    try {
        material = await Material.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (! material) {
      return res.status(404).json({ message: "No material found" });
    }
    return res.status(200).json({material});
  };
  
  const getBySupplierId = async (req, res, next) => {
    const id = req.userId;
    let materials;
    try {
      materials = await Material.find({supplierId:id});
    } catch (err) {
      console.log(err);
    }
    if (!materials) {
      return res.status(404).json({ message: "No product found" });
    }
    return res.status(200).json(materials);
  };
  
  const addMaterial = async (req, res, next) => {
      const { name,quantity, price,brand } =
        req.body;
      let material;
      try {
        material = new Material({
          supplierId:req.userId,
          name,
          quantity, 
          price,
          brand
          
        });
        await material.save();
      } catch (err) {
        console.log(err);
      }
      if (!material) {
        return res.status(500).json({ message: "Unable to add" });
      }
      return res.status(201).json(material);
    };
  
    //update products
  const updateMaterial = async (req, res, next) => {
    const id = req.params.id;
    const {  name,quantity, price,brand} = req.body;
    let material;
    try {
      material = await Material.findByIdAndUpdate(id, {
        name,
        quantity, 
        price,
        brand
      });
      material = await material.save();
    } catch (err) {
      console.log(err);
    }
    if (!material) {
      return res.status(404).json({ message: "Unable to Update by id" });
    }
    return res.status(200).json({ material });
  };
  
  //delete products
  const deleteMaterial = async (req, res, next) => {
    const id = req.params.id;
    let material;
    try {
      material = await Material.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!material) {
      return res.status(404).json({ message: "Unable to Delete by id" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  };
  
export{addMaterial,getById,getAllMaterials,getBySupplierId,updateMaterial,deleteMaterial}