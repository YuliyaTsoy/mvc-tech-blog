const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "someUser1",
        password: "topsecret1"
    },
    {
        username: "someUser2",
        password: "topsecret2"
    },
    {
        username: "someUser3",
        password: "topsecret3"
    },

]

const blogs = [
    {
        title: "Some Title1",
        content: "blah-blah",
        userId: 1
    },
    {
        title: "Some Title2",
        content: "lalala",
        userId: 1
    },
    {
        title: "Some Title3",
        content: "dadada",
        userId: 2
    },
    {
        title: "Some Title1",
        content: "tatata",
        userId: 3
    },
]

const comments = [
    {
        body: "Amazing!",
        blogId: 1,
        userId: 1
    },
    {
        body: "Cool!",
        blogId: 3,
        userId: 2
    },
    {
        body: "Agree!",
        blogId: 4,
        userId: 1
    },
    {
        body: "Helps a lot!",
        blogId: 2,
        userId: 3
    },

]

const seedDatabase = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

seedDatabase()