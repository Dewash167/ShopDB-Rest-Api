const express = require("express")
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose")
require("dotenv").config()

const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/order")
const userRoutes = require("./api/routes/user")
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect("mongodb+srv://shopdb:" + process.env.DB_PASSWORD + "@cluster0.6pgtw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
mongoose.Promise = global.Promise
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: true
}))
app.use('/uploads', express.static('uploads'))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    )
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;