//הרשמה-הוספת לקוח
const customer = require("../models/customer")
// התקנת הספריה - jsonwebtoken
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

module.exports = {
 
    register: (req, res) => {
        
        const { customerName,customerEmail, customerPassword} = req.body

        customer.findOne({ customerEmail:customerEmail })
            .then(users => {
                if (users) {
                    return res.status(409).send({ message: 'Email is already exists' })
                }
                
                bcrypt.hash(customerPassword, 10, (error, hash) => {
                    if (error) {
                        return res.status(500).send({ error: error.message })
                    }

                    const newCustomer = new customer({
                        customerName,
                        customerEmail,
                        customerPassword: hash,
                    })
                    newCustomer.save()
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
        const { customerEmail, customerPassword } = req.body;
    
        customer.findOne({ customerEmail: customerEmail })
            .then((cus) => {
                if (!cus) {
                    return res.status(404).send({ message: `Email do not exist!` });
                }
                
                bcrypt.compare(customerPassword, cus.customerPassword, (error, result) => {
                    if (error || !result) {
                        return res.status(500).send({ error: `Email and password do not match!` });
                    }
                    const token = jwt.sign({ customerEmail }, process.env.SECRET, {
                        expiresIn: '1hr' // hours
                    });
                    res.status(200).send({ message: `Login successful!`,currentUser:cus._id,token });
                });
            })
            .catch((err) => {
                res.status(403).send({ error: err.message });
            })
    }
}