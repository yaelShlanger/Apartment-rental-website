//הרשמה-הוספת מפרסם
const advertiser = require("../models/advertiser")
// התקנת הספריה - jsonwebtoken
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

module.exports = {
 
    register: (req, res) => {
        
        const { advertiserEmail, advertiserPassword, phone, additionalPhone } = req.body

        advertiser.find({ email: advertiserEmail })
            .then(users => {
                if (users.length > 1) {
                    return res.status(409).send({ message: 'Email is already exists' })
                }
                bcrypt.hash(advertiserPassword, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ error: error.message })
                    }

                    const newAdvertiser = new advertiser({
                        advertiserEmail,
                        advertiserPassword: hash,
                        phone,
                        additionalPhone
                    })
                    newAdvertiser.save()
                })
            })
            .then(() => {
                res.status(200).send('Wellcome to our application!')
            })
            .catch(error => {
                res.status(404).send({ error: error.message })
            })
    },

    login: (req, res) => {
        const { advertiserEmail, advertiserPassword } = req.body;
    
        advertiser.findOne({ advertiserEmail: advertiserEmail })
            .then((adv) => {
                if (!adv) {
                    return res.status(404).send({ message: `Email do not exist!` });
                }
                
                bcrypt.compare(advertiserPassword, adv.advertiserPassword, (error, result) => {
                    if (error || !result) {
                        return res.status(500).send({ error: 'Email and password do not match!' });
                    }
                    const token = jwt.sign({ advertiserEmail }, process.env.SECRET, {
                        expiresIn: '1hr' // hours
                    });
                    res.status(200).send({ message: `Login successful!`,currentUser:adv._id, token });
                });
            })
            .catch((err) => {
                res.status(403).send({ error: err.message });
            })
    }
    }