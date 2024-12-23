import {
  login as loginService,
  register as registerService,
} from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const response = await registerService(req.body);
    res.status(201).json(response);
  } catch (error) {
    if (error.cause === "conflict") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const response = await loginService(req.body);
    res.status(200).json(response);
  } catch (error) {
    if (error.cause === "bad_request") {
      res.status(400).json({ error: error.message });
    } else if (error.cause === "not_found") {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export { register, login };
