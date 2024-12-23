import { query } from "express";
import {
  findManyUsers as findManyUsersService,
  findUserById as findUserByIdService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/user.service.js";

const findManyUsers = async (req, res) => {
  try {
    const response = await findManyUsersService();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const response = await findUserByIdService(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const response = await updateUserService(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else if (error.cause === "conflict") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export { findManyUsers, findUserById, updateUser, deleteUser };
