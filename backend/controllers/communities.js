const Community = require("../models/Community");
const User = require("../models/User");

// @desc		Get All Communities
// @route		GET /api/communities
// @access	Public
exports.getCommunities = async (req, res, next) => {
  try {
		const communities = await Community.find();
		return res.status(200).json({
			success: true,
			count: communities.length,
			data: communities,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
}

// @desc		Add A Community
// @route		POST /api/communities
// @access	Private
exports.addCommunity = async (req, res, next) => {
  try {
		const { name, desc } = req.body;
		const community = await Community.create({ name, desc, creatorID: req.user.id, memberID: [req.user.id], memberCount: 1 });
    const user = await User.findById(req.user.id)
    user.joinedCommunityID.push(community.id);
    user.createdCommunityID.push(community.id)
    await user.save()
		return res.status(201).json({
			success: true,
			data: community,
			user,
		});
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(val => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error"
			});
		}
	}
}

// @desc		Change membership
// @route		POST /api/communities/member
// @access	Private
exports.updateMember = async (req, res, next) => {
  try {
		const { status, communityID } = req.body;
		const community = await Community.findById(communityID);
    if (!community) return res.status(400).json({ msg: "Community doesn't exist" })
    const user = await User.findById(req.user.id);

    if (status === "join") {
      if (community.memberID.indexOf(req.user.id) === -1) {
        community.memberID.push(req.user.id);
        community.memberCount++;
        user.joinedCommunityID.push(communityID);
      } else return res.status(400).json({ msg: "Already joined" })
    } else if (status === "leave") {
      if (community.memberID.indexOf(req.user.id) !== -1) {
        community.memberID.pull(req.user.id);
        community.memberCount--;
        user.joinedCommunityID.pull(communityID);
      } else return res.status(400).json({ msg: "Not joined" })
    } else return res.status(400).json({ msg: "Invalid option" })

    await community.save();
    await user.save();
		return res.status(200).json({
			success: true,
			community,
			user,
		});
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(val => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error"
			});
		}
	}
}