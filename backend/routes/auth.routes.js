import express from "express";

const router=express.Router();

import {signup ,login, logout, getMe} from "../controllers/auth.controller.js"

import protectRoute from "../middleware/protectroute.js"

router.get("/me", protectRoute, getMe);
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;