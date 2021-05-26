const express = require("express");
const router = express.Router();
const { getCommunities, addCommunity, updateMember } = require("../controllers/communities");
const auth = require("../middleware/auth")

router.get("/", getCommunities);
router.post("/", auth, addCommunity);
router.post("/member", auth, updateMember)

module.exports = router;
