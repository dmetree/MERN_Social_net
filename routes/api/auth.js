const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const User = require('../../models/User');


const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// @route   GET api auth
// @desc    Test route
// @access  Public

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   POST api/auth 
// @desc    Authenticate user and get token
// @access  Public

router.post('/', [
    check('email', 'Please a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.body);

        const { email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'Invalid credintials' }] });
            }

            //Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid credintials' }] });
            }


            // Return json webtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }

    });


module.exports = router;