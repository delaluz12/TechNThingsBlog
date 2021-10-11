//import router
const comment = require('express').Router();
const { User, Post, Comment } = require('../../models');
//import the helper script for authentication
const withAuth = require('../../util/auth');

//get all comments with their associated posts (with their associated user) and user that owns that comment, date it was created
comment.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                // {
                //     model: Post,
                //     attributes: ['id', 'title', 'content', 'user_id', 'created_at'],
                //     include: { model: User, attributes: ['username'] }
                // }, 
                { model: User, attributes: ['username'] },
            ],
            order: [
                ['created_at', 'DESC'],
            ],
        });
        res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//get single comment by ID
comment.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id, {
            where: {
                id: req.params.id
            }
        });
        if (!comment) {
            res.status(400).json({ message: 'No comment with that ID found' });
        }
        res.status(200).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//post a new comment --must be logged in
comment.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//update a comment's text by ID
comment.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            comment_text: req.body.comment_text,
        }, {
            where: { id: req.params.id }
        });
        if (!updateComment) {
            res.status(400).json({ message: 'No Comment with that ID found' })
        }
        res.status(200).json({ message: 'Successfully updated comment!' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//delete comment by ID
comment.delete('/:id', withAuth, async (req, res) => {
    try {
        const del = await Comment.destroy({
            where: { id: req.params.id },
        });
        if (!del) {
            res.status(400).json({ message: 'No Comment with that ID found' });
        }
        res.status(200).json({ message: 'Successfully deleted comment' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})






module.exports = comment;