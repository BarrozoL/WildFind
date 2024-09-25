import axios from "axios";

const DATABASE_URL = "http://localhost:5005";
//Separation of concerns; storing all of the CRUD functions and exporting them

//GET watchlist items
export const getAllWatchlistItems = async () => {
  try {
    const response = await axios.get(`${DATABASE_URL}/api/watchlist`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//GET all of the animals from the database
export const getAllAnimals = async () => {
  try {
    const response = await axios.get(`${DATABASE_URL}/api/specimens`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//GET single animal from database
export const getAnimal = async (id) => {
  try {
    const response = await axios.get(`${DATABASE_URL}/api/specimens/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//PUT request --> edit an animal/plant
export const editAnimal = async (id, requestBody) => {
  try {
    const response = await axios.put(
      `${DATABASE_URL}/api/specimens/${id}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// DELETE an animal/plant
export const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${DATABASE_URL}/api/specimens/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//PUT request --> edit user
export const editUser = async (id, requestBody) => {
  try {
    const response = await axios.put(
      `${DATABASE_URL}/api/users/${id}`,
      requestBody
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//Get animals with sightings
export const getAnimalsWithSightings = async (specimenId) => {
  try {
    const response = await axios.get(
      `${DATABASE_URL}/specimens/${specimenId}/sightings`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
