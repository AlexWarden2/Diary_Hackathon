const express = require('express');
const cors = require('cors');

const logRoutes = require('morgan')

const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes('dev'));

api.get("/", (req, res) => {
    res.json({
        name: "Discretion",
        description: "Send and receive private messages.",
        endpoints: [
            'GET  /posts',
            'GET  /posts/:id',
            'POST  /posts',
            'DELETE  /posts/:id',
            'POST  /users/login',
            'POST  /users/register',
            'GET  /users/logout'
          ]
    })
})

api.use("/posts", postRouter);
api.use("/users", userRouter);

module.exports = api;
