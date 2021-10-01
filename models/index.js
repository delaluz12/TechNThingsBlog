//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


//define Associations

//user has many posts --- user is linked to posts by user_id in posts table
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//Post belongs to user --- link with user_id in post table
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//comments belong to User --- comments&users linked thru user_id in comments table
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//a comment belongs to a post --- comment&post linked thru post_id in comment table
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//user can have many comments --- comments&users linked thru user_id in comments table
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//post can have many comments --- comment&post linked thru post_id in comment table
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

//export models
module.exports = {
    User,
    Post,
    Comment,
};

