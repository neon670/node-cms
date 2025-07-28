const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();
const faker = require('faker');



router.get('/', (req, res)=>{
    res.render('admin/index');
});

// router.get('/', (req, res)=>{
//     res.render('admin/dashboard');
// });
router.post('/admin/generate-fake-posts',(req,res)=>{
    for (let i = 0; i < req.body.amount; i++) {
        var post = new Post();
        post.title = faker.name.title();
        post.body = faker.lorem.paragraphs(4);
        post.status = 'public';
        post.allowComments = faker.random.boolean();

        post.save().then(savedPost={});
        res.redirect('/admin/posts');
        
    }
})



module.exports = router;