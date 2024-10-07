const express = require('express');
const router = express.Router();
const ownerModdel = require("../models/owner-model");



if (process.env.NODE_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModdel.find();
        if (owners.length > 0) {
            return res
                .status(504)
                .send("you don't have permission create a new owner");
        }
        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModdel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    });
} 



router.get("/admin", function (req, res) {
    let success = req.flash("success");
    res.render("createproducts",{success});
});

module.exports = router;