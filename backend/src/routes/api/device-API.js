/**
 * Defines routes for managing notification tokens 
 */

import express from "express";
import { createToken,deleteToken} from "../../controllers/device-dao.js";
import {verifyToken} from "../../middleware/verifyToken.js";

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
  const {token} = req.body;
    const newToken = await createToken({token, userId:req.userId});
    res.status(201).json(newToken);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/', verifyToken, async (req, res) => {
   try {
  const {token} = req.body;
    const deletedToken = await deleteToken({token, userId:req.userId});
    if (!deletedToken) {
      res.status(404).json({ message: 'Token not found' });
    } else {
      res.json({ message: 'Token deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
