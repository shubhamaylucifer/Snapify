const cloudinary = require('cloudinary').v2;        
 
cloudinary.config({ 
  cloud_name: 'dd1h16do7', 
  api_key: '495791242727377', 
  api_secret: 'CId5V6tLTtkmRMv9-cOn0QRjI0g' 
});

module.exports = cloudinary;