//הרשמה-הוספת מפרסם
const advertiser = require("../models/advertiser")
// התקנת הספריה - jsonwebtoken
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

module.exports = {
    register: (req, res) => {
        
        const { advertiserName, email, password, phone, additionalPhone } = req.body

        advertiser.find({ email: { $eq: email } })
            .then(users => {
                // if (users.length > 0) {
                //     return res.status(409).send({ message: 'Email is already exists' })
                // }

                //bcrypt.hash - יוצרת מחרוזת שמצפינה את האובייקט שנשלח אליה
                //נשתמש בה ע"מ ליצור מחרוזת מוצפנת לסיסמה ואותה נשמור במסד
                //הפונקציה מקבלת שלשה ארגומנטים
                //1. האובייקט עליו נפעיל את ההצפנה
                //2. מספר או מחרוזת כלשהי שלפיה הפונקציה תגריל את המחרוזת
                //3. פונקציית callback
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ error: error.message })
                    }
                    const newAdvertiser = new advertiser({
                        advertiserName,
                        email,
                        password: hash,
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
    }
,
    login: (req, res) => {

        const { email, password } = req.body

        advertiser.find({ $and: [{ password: { $eq: password } }, { email: { $eq: email } }] })
            .then((adv) => {

                if (!adv) {
                    res.status(404).send({ message: `email and password are not match!` })
                }
                const token = jwt.sign({ email, password }, process.env.SECRET, {
                    // תוקף למחרוזת האבטחה
                    expiresIn: '1hr' // hours
                })
                res.status(200).send({ message: `login successfuly!`, token })
            }
            )
            .catch((err) => {
                res.status(404).send({ error: err.message })
            })
    }
}