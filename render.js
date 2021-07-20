const path = require("path")
const fs = require("fs")

module.exports = (req, res, next) => {
    res.render = (file, options={}) => {
        let template = fs.readFileSync(path.join(__dirname, "views", file)).toString()

        for (const [key, value] of Object.entries(options)) {
            template = template.replace(`#{${key}}`, value)
        }

        res.send(template)
    }
    
    next()   
}