const express = require("express");
const axios = require("axios");

const app = express();

// 🔑 PUT YOUR DISCORD APP INFO HERE
const CLIENT_ID = 1510580274885427220;
const CLIENT_SECRET = eZlimf3ahAOTAZ7RFO7c6eqJP-gMS5i0;

// ⚠️ This must match your Render URL later
const REDIRECT_URI = https://mythogfn.mysellauth.com/discord/callback;

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) return res.send("No code received from Discord");

  try {
    // STEP 1: exchange code for access token
    const tokenRes = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // STEP 2: get user info from Discord
    const userRes = await axios.get(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const discordId = userRes.data.id;

    console.log("Discord User ID:", discordId);

    // STEP 3: show success message
    res.send("Discord connected successfully. You can close this page.");

  } catch (err) {
    console.error(err);
    res.send("Error connecting Discord");
  }
});

// start server
app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
