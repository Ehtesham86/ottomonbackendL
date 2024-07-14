const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const {User} = require('../models/users');

// @route    GET api/auth
// @desc     Get logged user
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
       	const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error 19');
	}
});
// Update password
// router.post('/api/user/update-password',auth,user-AbortController.update_password);
router.post('/reset-password',(req,res)=>{
	crypto.randomBytes(32,(err,buffer)=>{
		if(err){
			console.log(err)
		}
		const token = buffer.toString("hex")
		User.findOne({email:req.body.email})
		.then(user=>{
			if(!user){
				return res.status(422).json({error:"User dont exists with that email"})
			}
			user.resetToken = token
			user.expireToken = Date.now() + 3600000
			user.save().then((result)=>{
				transporter.sendMail({
					to:user.email,
					from:"no-replay@insta.com",
					subject:"password reset",
					html:`
					<p>You requested for password reset</p>
					<h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
					`
				})
				res.json({message:"check your email"})
			})

		})
	})
})

router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
        
	],
	async (req, res) => {
		const errors = validationResult(req);

 
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
           
            // console.log(user.userType);

           
			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}
    
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token,email });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error ');
		}
	}
);

module.exports = router;