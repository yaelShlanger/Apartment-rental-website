const category = require("../models/category")
const advertiser=require("../models/advertiser")
module.exports = {

             create: (req, res) => {
                advertiser.findById(req.params.id)
                    .then((exists) => {
                        if (!exists) {
                            return res.status(404).send({ message: `you arnt advertiser!` });
                        }
                        else {
                            const { categoryName } = req.body;
                            category.find( {categoryName:categoryName})
                                .then((ca) => {
                                    if (ca.length === 0) {
                                        const newCategory = new category(req.body);
                                        return newCategory.save();
                                    } else {
                                        return res.status(404).send({ message: `Category already exists!` });
                                    }
                                })
                                .then((c) => {
                                    res.status(200).send({ message: `create category ${c._id} succeed!` });
                                })
                                .catch((err) => {
                                    res.status(500).send({ message: `הגיע לשגיאה ביצירת הקטגוריה` });
                                });
                        }
                    })
                    .catch((err) => {
                        res.status(404).send({ message: `הגיע לשגיאה בחיפוש אחר מפרסם` });
                    });
            },
                getAllCategory: (req, res) => {
                    category.find()
                        .then((list) => {
                            res.status(200).send({ category: list })
                        })
                        .catch((err) => {
                            res.status(404).send({ error: err.message })
                        })
                }
            }

