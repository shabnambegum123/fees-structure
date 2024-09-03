const multer = require('multer')

let setStorage = multer.diskStorage({

  destination: (req, file, cb) => {

      cb(null,'./Excelsheet')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)

  }
})

let upload = multer({ storage: setStorage })

module.exports ={upload}


