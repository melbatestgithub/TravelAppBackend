const Country = require("../models/Country");
const addCountry = async (req, res, next) => {
  const { name, description, imageUrl, region, popular } = req.body;
  try {
    const newCountry = new Country({
      name,
      description,
      imageUrl,
      region,
      popular,
    });
    await newCountry.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCountry = async (req, res, next) => {
  try {
    const countries = await Country.find(
      { isPopular: true },
      { name: 1, description: 1, imageUrl: 1 }
    );
    res.status(200).json({
      success: true,
      countries,
    });
  } catch (error) {
    next(error);
  }
};
const getCountry = async (req, res, next) => {
  const id = req.params.id;
  try {
    const country = await Country.findById(id);
    if (!country) {
      return res.status(401).json({
        success: false,
        message: "country is not found",
      });
    }
    res.status(200).json({
      success: true,
      country,
    });
  } catch (error) {
    next(error);
  }
};
const updateCountry = async (req, res, next) => {
  try {
    const result = await Country.updateMany(
      {},
      {
        $set: {
          isRecommended: false,
          isPopular: false,
        },
      }
    );
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  const allCountry = await Country.find(
    {},
    { name: 1, description: 1, imageUrl: 1 }
  );
  res.status(201).send({
    success: true,
    data: allCountry,
  });
};

const getPopular = async (req, res, next) => {
  const popular = await Country.find(
    {
      isPopular: true,
    },
    { name: 1, description: 1, imageUrl: 1 }
  );
  res.status(200).send({
    success: true,
    data: popular,
  });
};

const getRecommended = async (req, res, next) => {
  try {
    const recommended = await Country.find(
      { isRecommended: true },
      { name: 1, description: 1, imageUrl: 1 }
    );
    res.status(201).send({
      success: true,
      data: recommended,
    });
  } catch (error) {}
};

module.exports = {
  addCountry,
  getAllCountry,
  getCountry,
  updateCountry,
  getAll,
  getPopular,
  getRecommended,
};
