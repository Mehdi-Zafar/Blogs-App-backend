const model = require('../models/model');
const mongoose = require('mongoose');


// Get all blogs
const getBlogs = async (req,res)=>{
    const blogs = await model.find()

    res.status(200).json({blogs})
} 

// Get single blog
const getBlog = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})
    }
    const blog = await model.findById(id)

    if(!blog){
        return res.status(404).json({error: "No such blog"})
    }

    res.status(200).json(blog)
}

// create blog
const createBlog = async (req,res)=>{
    const {title,snippet,content} = req.body

    try{
        const blog = await model.create({title,snippet,content})
        res.status(200).json(blog)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

// Delete a blog
const deleteBlog = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})
    }
    const blog = await model.findOneAndDelete({_id:id})

    if(!blog){
        return res.status(404).json({error: "No such blog"})
    }

    res.status(200).json(blog)
}

// Update Blog
const updateBlog = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such blog"})
    }
    const blog = await model.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!blog){
        return res.status(404).json({error: "No such blog"})
    }

    res.status(200).json(blog)
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}