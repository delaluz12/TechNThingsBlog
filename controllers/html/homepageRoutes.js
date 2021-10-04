//import router
const homepage = require('express').Router();
const { User, Post, Comment } = require('../../models');


//get all posts to display when user first visits website
homepage.get('/', async (req, res) => {
    try {
        const dbPosts = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                }, { model: User, attributes: ['username'] },
            ]
        });
        const posts = dbPosts.map((post) =>
            post.get({ plain: true })
        );
        // console.log(posts);
        console.log(req.session.logged_in);
        res.render('homepage', { posts, loggedIn: req.session.logged_in })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//render login form when 'login' is clicked
homepage.get('/login', (req, res) => {
    try {
        //check to see if already logged in
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        //if not then render the login form
        res.render('login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//render signup form
homepage.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
homepage.get('/posts/:id', async (req, res)=> {
    try {
        const dbPost = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment, 
                    attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                }, { model: User, attributes: ['username'] },
            ]
        });
        if(!dbPost){
            res.status(400).json({message: 'No post found with that ID'});
            return;
        }
        const post = dbPost.get({ plain: true});
        res.render('singlePost', {post, loggedIn: req.session.logged_in});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//render single post with comments when the title is clicked on the homepage --- must be logged in to view the comment option
// homepage.get('/posts/:id', async (res, req) => {
//     try {
//         const dbPost = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
//                     include: { model: User, attributes: ['username'] }
//                 }, { model: User, attributes: ['username'] },
//             ]
//         });
//         const post = dbPost.get({plain: true});
//         res.render('singlePost', {post, loggedIn: req.session.logged_in});
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

module.exports = homepage;