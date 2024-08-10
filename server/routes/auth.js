import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
  
      const chatEngineResponse = await axios.post(
        "https://api.chatengine.io/users/",
        {
          username: username,
          secret: password,
        },
        {
          headers: { "Private-Key": process.env.PRIVATE_KEY },
        }
      );
  
      res.status(200).json({ response: chatEngineResponse.data });
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      const statusCode = error.response?.status || 500;
      res.status(statusCode).json({ error: error.response?.data || error.message });
    }
  });
  

export default router;