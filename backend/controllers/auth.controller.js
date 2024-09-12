import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import generateTokenAndSetCookies from "../lib/utils/generateToken.js";
// import sendEmail from "../gmail.js"


export const OTPVerification = async(req, res) => {
  try {
    console.log(req.body);
    const { email, enteredOtp, generatedOtp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    else if(enteredOtp !== generatedOtp) {
      return res.status(400).json({ message: "Invalid OTP" })
    }
    else {
      user.isOtpVerified = true;
      await user.save();
      res.status(200).json({message: "OTP verified successfully!!"});
    }

  } catch (error) {
    console.log(error);
  }
}
// export const signup = async (req, res) => {
//   try {
//     const { fullName, username, email, password } = req.body;
//     console.log(req.body);

    
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ error: "Invalid email format" });
//     }

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ error: "Username is already taken" });
//     }

//     const existingEmail = await User.findOne({ email }); // Corrected the method name here
//     if (existingEmail) {
//       return res.status(400).json({ error: "Email is already taken" });
//     }
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ error: "Password must be at least 6 characters" });
//     }
//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const otp = Math.floor(100000 + Math.random() * 900000);
//     console.log(otp);
//     const transporter = nodemailer.createTransport({
//       service:'gmail',
//       // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "anuragvig2@gmail.com",
//       pass: "navr fhxn eewy dyaz",
//     },
//   });
  
//   // async..await is not allowed in global scope, must use a wrapper
//   const sendEmail = async function(email,otp) {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: 'anurag2gmail.com', // sender address
//       to: email, // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: `<b>Your otp is ${otp} </b>`, // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }

//     // Create new user
//     const newUser = new User({
//       fullName,
//       username,
//       email,
//       password: hashedPassword,
//       otp,
//     });

//     if (newUser.isOtpVerified==false) {
//       return res.status(400).json({ error: "not verified" });
     
//      }

//      generateTokenAndSetCookies(newUser._id, res);
//       await newUser.save();
//       console.log(newUser);
//       sendEmail(email,otp);
//       res.status(201).json({
//         _id: newUser._id, // Corrected the key here as well
//         fullName: newUser.fullName,
//         username: newUser.username,
//         email: newUser.email,
//         followers: newUser.followers,
//         followings: newUser.followings,
//         profileImg: newUser.profileImg,
//         coverImg: newUser.coverImg,
//         otp: newUser.otp,
//       });
    
  
//     // console.log(newUser);
//   } catch (error) {
//     console.error("Error in signup controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    
    // Validate email format and other checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create new user but set `isOtpVerified` to false
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      otp,
      isOtpVerified: false, // Ensure this is set to false initially
    });

    // Save user to the database
    await newUser.save();

    // Send OTP to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anuragvig2@gmail.com',
        pass: 'navr fhxn eewy dyaz', // Use environment variables for security
      },
    });

    const sendEmail = async (email, otp) => {
      await transporter.sendMail({
        from: 'anuragvig2@gmail.com',
        to: email,
        subject: 'OTP Verification',
        html: `<b>Your OTP is ${otp}</b>`,
      });
    };

    sendEmail(email, otp);

    // Send success response after signup
    return res.status(201).json({
      message: "Signup successful. Please verify your OTP.",
      email, // Send email to the frontend for localStorage
      otp,   // Send OTP to the frontend for localStorage
    });
    
  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// export const login = async (req, res) => {
//   try {
//     const {username ,password}=req.body;
//     const user = await User.findOne({ username });
//     const isPasswordCorrect= await bcrypt.compare(password,User?.password || " ");
//     if (!user || !isPasswordCorrect) {
//         return res.status(400).json({ error: "Invalid username or password" });
//         }
//         generateTokenAndSetCookies(user._id, res);
//         res.status(200).json({
//             _id: newUser._id, // Corrected the key here as well
//         fullName: newUser.fullName,
//         username: newUser.username,
//         email: newUser.email,
//         followers: newUser.followers,
//         followings: newUser.followings,
//         profileImg: newUser.profileImg,
//         coverImg: newUser.coverImg,
//         });
//   } catch (error) {
//     console.error("Error in login controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    if(user.isOtpVerified == false) {
      return res.status(400).json({ error: "Please verify your OTP" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate token and set cookies
    generateTokenAndSetCookies(user._id, res);

    // Respond with user data
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      followings: user.followings,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", { maxAge: 0 });

    // Send a response confirming logout
    res.status(200).json({ data: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
