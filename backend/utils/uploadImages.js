const express = require('express')
const router = express.Router()               // router will be used to handle the request.
const multer = require('multer')              // multer will be used to handle the form data.
const Aws = require('aws-sdk')                // aws-sdk library will used to upload image to s3 bucket.
require("dotenv/config")  







