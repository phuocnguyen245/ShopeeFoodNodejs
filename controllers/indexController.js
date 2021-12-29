require('../models/database')
require('dotenv').config()
const Category = require('../models/Category')
const Shop = require('../models/Shop')
const User = require('../models/Users')

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

// Homepage

exports.renderHomepage = async (req, res) => {
    try {
        const limitCategory = 5
        const limitShop = 12
        const categories = await Category.find({}).limit(limitCategory)
        const shops = await Shop.find({})
        const shopee = {
            categories,
            shops
        };
        const getShops = shopee.shops.map((shopJson) => shopJson);
        //get category of shop === category id
        const getCateByShop = shopee.categories.filter((categoryJson) => {
            return getShops.some((shop) => {
                return shop.category === categoryJson.id;
            });
        });
        const shopeeValue = {
            shopValue: getShops,
            categoryValue: getCateByShop,
        };
        res.render('index', { title: 'HomePage', shop: shopeeValue });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.renderCategoryPage = async (req, res) => {
    try {
        let cateID = Number(req.params.id);
        console.log(typeof cateID);
        const shop = await Shop.find({ 'category': cateID })

        res.render('categories', { title: 'Categories', shop });
    } catch (e) {
        res.status(500).send({ message: e.message || "Error Occured" });
    }
}

exports.renderCreate = async (req, res) => {
    const infoErrorsObj = req.flash('infoError')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('createNew', { title: 'Submit', infoErrorsObj, infoSubmitObj });
}

exports.handleCreate = async (req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No Files where uploaded.');
        } else {

            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;

            imageUploadFile.mv(uploadPath, function (err) {
                if (err) return res.satus(500).send(err);
            })
            console.log('success');
        }

        const newShop = new Shop({
            shopName: req.body.shopName,
            address: req.body.address,
            cost: Number(req.body.cost),
            category: Number(req.body.category),
            img: newImageName
        });

        console.log(newShop);

        await newShop.save();

        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/createNew');

    } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('/createNew');
    }
}

exports.renderCRUDPage = async (req, res) => {
    try {
        const shops = await Shop.find({})
        res.render('manaInterface',  {shops});
    } catch (error) {
        res.status(500).send({ message: e.message || "Error Occured" });
    }
}

exports.handleDelete = async (req, res) => {
    try {
        await Shop.findByIdAndDelete({ _id: req.params.id })
        res.redirect('/manaInterface')

    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.renderUpdateForm = async (req, res) => {
    try {
        const shop = await Shop.find({ _id: req.params.id })
        res.render('updateForm', { title: 'Update Shop', shop });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.handleUpdate = async (req, res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if (!req.files || Object.keys(req.files).length === 0) {
            console.log('No Files where uploaded.');
        } else {

            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./') + '/public/img/' + newImageName;

            imageUploadFile.mv(uploadPath, function (err) {
                if (err) return res.satus(500).send(err);
            })
            console.log('success');
        }

        const { shopName, address, cost, category, img } = req.body
        await Shop.findOneAndUpdate({ _id: req.params.id }, { shopName, address, cost, category, img: newImageName })
        res.redirect('/manaInterface')
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.renderLogin = async (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

exports.handleLogin = async (req, res) => {
    try {
        const userLogin = {
            username: req.body.username,
            password: req.body.password
        }
        const getUser = await User.find({ username: userLogin.username, password: userLogin.password })
        // const jwtoken = getUser.map((user => {
        //     const userToken = {username: user.username, password: user.password}
        //     console.log(userToken);
            // const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
        //     // return accessToken
        //     res.json(accessToken)
        // }))
        // res.json({jwtoken})
        
        const getUserLoginRole = getUser.map((user => user.role))

        if (getUser.length > 0) {
            if (getUserLoginRole == 'admin') {
                res.redirect('/manaInterface')
            } else {
                res.redirect('/')
            }
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}