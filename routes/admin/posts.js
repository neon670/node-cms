const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');



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
    res.redirect('/admin/posts')
    });

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

        post.save().then(updatedPost =>{
            res.redirect('admin/posts')
        })
        
    });
});

router.delete('/edit:id', (req,res)=>{
    Post.remove({_id:req.params.id}).then(result=>{
        res.redirect('admin/posts/')
    });
});






module.exports = router;