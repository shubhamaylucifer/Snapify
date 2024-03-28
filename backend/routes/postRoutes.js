const express = require("express");
const { createPost, showSinglePost, deletePost, showPost, addComment, addLike, removeLike } = require("../controllers/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();               // router will be used to handle the request.
const multer = require('multer');       // multer will be used to handle the form data.
const Aws = require('aws-sdk');                // aws-sdk library will used to upload image to s3 bucket.
require("dotenv/config");  
const Post = require('../models/postModel')  // our product model.
// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
  });

  // creating the storage variable to upload the file and providing the destination folder, 
// if nothing is provided in the callback it will get uploaded in main directory

const storage = multer.memoryStorage({
    
    destination: function (req, file, cb) {
        cb(null, '')
    }
  })
  
// below variable is define to check the type of file which is uploaded
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
  }

  // defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage: storage, fileFilter: filefilter });

//post create
router.post('/post/create', isAuthenticated, isAdmin,  createPost);

// now how to handle the post request and to upload photo (upload photo using the key defined below in upload.single ie: productimage )
router.post('/post/createupload', isAuthenticated, isAdmin, upload.single('postImage'), (req, res) => {
    console.log("req.file",req.file)  // to check the data in the console that is being uploaded
  
    // Definning the params variable to uplaod the photo
    
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:req.file.originalname,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read-write",                 // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };
  
   // uplaoding the photo using s3 instance and saving the link in the database.
    
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }
  
   // If not then below code will be executed
        
    console.log("data",data);                    // this will give the information about the object in which photo is stored 
    

      // saving the information in the database.   
        const post = Post.create({
            title: req.body.title,
            content: req.body.content,
            postedBy: req.user_id,
            imageUrl: data.Location
        });
        res.status(201).json({
            success: true,
            post
        });
    })
});


//show post
router.get('/posts/show', showPost);

//show single post
router.get('/post/:id', showSinglePost);

//delete single post
router.delete('/delete/post/:id', isAuthenticated, isAdmin, deletePost);

router.put('/comment/post/:id', isAuthenticated, addComment);
router.put('/addlike/post/:id', isAuthenticated, addLike);
router.put('/removelike/post/:id', isAuthenticated, removeLike);

module.exports = router;