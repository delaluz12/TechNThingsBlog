//import router
const post = require('express').Router();

const { User, Post, Comment } = require('../../models');
//import the helper script for authentication
const withAuth = require('../../util/auth');

// get all posts
post.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            //include comment and user associations - remember to incl association for comment & its owner as well
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                }, { model: User, attributes: ['username'] },
            ]
        });
        // console.log(posts)
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

//get post by ID 
post.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                }, { model: User, attributes: ['username'] },
            ]
        });
        if (!post) {
            res.status(400).json({ message: 'No Post found with that ID' });
            return;
        };
        res.status(200).json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//create new post
post.post('/', withAuth,  async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            //grab the user_id from the user in the current session
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//update post by ID --updates title and content
post.put('/:id', withAuth, async (req, res)=> {
    try {
        const updatePost = await Post.update( {
            title: req.body.title,
            content: req.body.content
        }, {
            where: {id: req.params.id}
        });
        if(!updatePost){
            res.status(400).json({message : "No Post found with that ID"})
        }
        res.status(200).json({message : "Post successfully updated!"});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete post by ID 
post.delete('/:id', withAuth, async (req, res)=> {
    try {
        const delPost = await Post.destroy({
            where:{ 
            id: req.params.id
            },
        });
        if(!delPost){
            res.status(400).json({message : "No post with that ID found"});
        }
        res.status(200).json({message: "Post successfully deleted!"});
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})




module.exports = post;