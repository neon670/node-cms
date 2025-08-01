const express = require('express');
const Post = require('../../models/Post');
const router = express.Router();
const faker = require('faker');
const Category = require('../../models/Categories');



router.get('/', (req, res)=>{
     Category.find({}).then(categrories=>{
        res.render('admin/categories/', {category:categories});
        });
});

router.post('/create', (req, res)=>{
    
    const newCategory = new Category({
            name: req.body.name
        })

        newCategory.save().then(saveCategory =>{
        req.flash('success-message', 'Category was created successfully');
        res.redirect('/admin/categories/');
        }).catch(validator=>{
            validator.errors
        });
    
    
});

router.delete('/:id', (req,res)=>{
    Post.findOne({_id:req.params.id}).then(category=>{
                 category.remove();
            req.flash('success_messgae', 'Post was successfully deleted.');
            res.redirect('admin/categories/')
        
       
    });
});



module.exports = router;