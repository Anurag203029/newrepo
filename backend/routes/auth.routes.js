import express from "express";

const router=express.Router();

import {signup ,login, logout, getMe, OTPVerification} from "../controllers/auth.controller.js"

import protectRoute from "../middleware/protectroute.js"

router.get("/me", protectRoute, getMe);
router.post("/signup",signup);
router.post("/otp-verify",OTPVerification);
router.post("/login",login);
router.post("/logout",logout);

export default router;