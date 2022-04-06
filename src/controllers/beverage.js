const { beverage} = require("../../models");
const cloudinary = require('../utils/cloudinary')

exports.getBeverages = async (req, res) => {
  try {
    let data = await beverage.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data))

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image
      }
    })
    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addBeverage = async (req, res) => {
  try {
    const { title,price } = req.body
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'dumbways_file',
      use_filename: true,
      unique_filename: true,
    });

    let newBeverage = await beverage.create({
      title,
      price,
      image: result.public_id,
    })

    newBeverage = JSON.parse(JSON.stringify(newBeverage))

    newBeverage = {
      ...newBeverage,
      image: process.env.FILE_PATH + newBeverage.image
    }
    
    res.send({
      status: 'success',
      data: {
        newBeverage
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await beverage.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.FILE_PATH + data.image,
    };

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateBeverage = async (req, res) => {
  try {
    const { id } = req.params;
    const dataBeverage ={
        title : req.body.title,
        price : req.body.price,
        image : req.file.filename
    }
    let updateBeverage = await beverage.update(dataBeverage, {
      where: {
        id,
      },
    });

   updateBeverage = JSON.parse(JSON.stringify(updateBeverage))

   updateBeverage = {
    title : req.body.title,
    price : req.body.price,
    image : process.env.FILE_PATH + updateBeverage.image
   }
  
    res.send({
      status: "success",
      message: `Update beverage id: ${id} finished`,
      Beverage: updateBeverage,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBeverage = async (req, res) => {
  try {
    const { id } = req.params;

    await beverage.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete Beverage id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};