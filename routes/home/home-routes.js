const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');



router.get('/', (req, res)=>{
     Post.find({}).then(posts=>{
            res.render('home/index',{posts:posts})
        });
});

router.get('/about', (req, res)=>{
    res.render('home/about');
});

router.get('/register',(req,res)=>{
    res.render('home/register');
});

router.get('/login',(req,res)=>{
    res.render('home/login');
});

router.get('/post/:id', (req, res)=>{
    Post.findOne({_id: req.params.id})
        .then(posts=>{
        res.render('home/post/',{posts:posts});
        });
});


module.exports = router;