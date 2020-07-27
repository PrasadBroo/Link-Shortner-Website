require('dotenv').config();
const express = require('express');
const mongose = require('mongoose');
const shortId = require('shortid');
const router = express.Router();
const Db = require('../stars/db');

mongose.connect(process.env.MONGOOSE_URL,{
    useNewUrlParser: true,useUnifiedTopology: true
});


router.post('/shortme',async(req,res)=>{

    let url = req.body.fullurl;
    // Add your own domain in base_domain
    let base_domain = 'http://nanolink.ga/'; 
    let shortcode = shortId.generate();

   await Db.create({FullUrl:url,ShortUrl:shortcode});

  res.json({Status:'Success',Full_Url: url,Short_Url:base_domain+shortcode});
});


router.get('/:shorturl',async (req,res)=>{

    let shortcode = req.params.shorturl;

    const gotIt = await Db.findOne({ShortUrl:shortcode}).catch(err=>res.json({Status:'Fail',Warning:'Server Error...'}));
    if(gotIt == null)return res.status(404).json({Status:'Fail',Warning:'No Url Found'});
    res.redirect(gotIt.FullUrl);
});





module.exports = router;