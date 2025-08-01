const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const {isEmpty, uploadDir} = require('../../helpers/handlebar-helpers');
const fs = require('fs');
const path = require('path');


// router.get('/', (req, res)=>{
//     res.render('admin/post');
// });


router.get('/', (req, res)=>{
    Post.find({}).then(posts=>{
        res.render('admin/posts',{posts:posts})
    });
    // res.render('admin/posts');
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{
    var errors = []

    if(!req.body.title){
        errors.push({message: "Please add a title"});
    }

    if(errors.length > 0){
        req.render('/admin/posts/create', {
            errors:errors
        });

    }else{

    var filename ="https://placehold.co/600x400";
    if(!isEmpty(req.files)){
        var file = req.files.file;
        filename = Date.now() + '-' + file.name;
    
        file.mv('.public/uploads' + filename, (err)=>{
            if(err) throw err;
        });
    }
    

    var allowComments = true;

    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: req.body.allowComments,
        body: req.body.body
    })

    newPost.save().then(savePost =>{
    req.flash('success-message', 'Post was created successfully');
    res.redirect('/admin/posts');
    }).catch(validator=>{
        validator.errors
    });

    }
    
});

router.get('/edit:id', (req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        res.render('admin/posts/edit',{post:post})
    });
});

router.put('/edit/:id',(res,req)=>{
   Post.findOne({_id:req.params.id}).then(post=>{
        var allowComments = true;

        if(req.body.allowComments){
            allowComments = true;
        }else{
            allowComments = false;
        }

        post.title = req.body.title,
        post.status= req.body.status,
        post.allowComments= req.body.allowComments,
        post.body= req.body.body

        if(!isEmpty(req.files)){

        var file = req.files.file;
        filename = Date.now() + '-' + file.name;
        post.file = filename;
    
        file.mv('.public/uploads' + filename, (err)=>{
            if(err) throw err;
        });
    }
    
        post.save().then(updatedPost =>{
            req.flash('success_messgae', 'Post was successfully updated.');
            res.redirect('admin/posts')
        })
        
    });
});

router.delete('/:id', (req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        fs.unlink(post.file, (err)=>{
            post.remove();
            req.flash('success_messgae', 'Post was successfully deleted.');
            res.redirect('admin/posts/')
        });
       
    });
});






module.exports = router;