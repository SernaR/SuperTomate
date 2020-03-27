const multer = require('multer')

/* //pour stocker directement sur le disk
exports.fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb( null, 'images' )
    },
    filename: (req, file, cb) => {
        cb( null, new Date().toDateString()+ '-' +file.originalname)
    }
})
*/

exports.memoryStorage = multer.memoryStorage()

exports.fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }   
}

