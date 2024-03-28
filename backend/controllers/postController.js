const cloudinary = require("../utils/cloudinary");

const Post = require("../models/postModel");
const Aws = require('aws-sdk');  
const ErrorResponse = require("../utils/errorResponse");
require("dotenv/config");  

// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
  });

//create post
exports.createPost = async (req, res, next) => {
    const { title, content, postedBy, image, likes, comments} = req.body;
   
    
    try {
         

        //upload imae in cloudinary.
        const result = await cloudinary.uploader.upload(image, {
            folder: "post",
            width: 1200,
            crop: "scale"
        })
        const post = await Post.create({
            title,
            content,
            postedBy: req.user_id,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })
        res.status(201).json({
            success: true,
            post
        })
    } catch (error) {
        next(error);
    }
}

//show posts
exports.showPost = async (req, res, next) => {
     try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy','name');
        res.status(201).json({
            success: true,
            posts
        })
     } catch (error) {
        next(error);
     }
}

//show single posts
exports.showSinglePost = async (req, res, next) => {
    try {
       const posts = await Post.findById(req.params.id).populate('comments.postedBy','name');
       res.status(201).json({
           success: true,
           posts
       })
    } catch (error) {
       next(error);
    }
}

//delete post
exports.deletePost = async (req, res, next) => {
    const currentPost = await Post.findById(req.params.id);
    console.log("currentPost",currentPost);
    if(currentPost.imageUrl){
        const fileName= currentPost.imageUrl.substring(currentPost.imageUrl.lastIndexOf('/') + 1);
        console.log(currentPost.imageUrl.substring(currentPost.imageUrl.lastIndexOf('/') + 1));
        s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName 
          },function (err,data){
            if (err) {
                res.status(500).send(err);
              }
             // res.status(200).send("File has been deleted successfully");
          });
    }
   
    if(currentPost.image.public_id) {
        await cloudinary.uploader.destroy(currentPost.image.public_id);    
    }
    try {
     const post = await Post.findByIdAndRemove(req.params.id);
       res.status(201).json({
           success: true,
           message: "post deleted"
       })
    } catch (error) {
       next(error);
    }
}


//add comment
exports.addComment = async (req, res, next) => {
    const { comment } = req.body;
    try {
        const postComment = await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: { text: comment, postedBy: req.user._id } }
        },
            { new: true }
        );
        const post = await Post.findById(postComment._id).populate('comments.postedBy', 'name email');
        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }

}


//add like
exports.addLike = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $addToSet: { likes: req.user._id }
        },
            { new: true }
        );
        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
       // main.io.emit('add-like', posts);

        res.status(200).json({
            success: true,
            post,
            posts
        })

    } catch (error) {
        next(error);
    }

}


//remove like
exports.removeLike = async (req, res, next) => {

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id }
        },
            { new: true }
        );

        const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'name');
        //main.io.emit('remove-like', posts);

        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        next(error);
    }

}