const path = require("path")

module.exports = (req, res, next) => {
    res.render = (file) => {
        res.sendFile(path.join(__dirname, "views", file))
    }
    
    next()   
}