//import router
const dashboard = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../util/auth');


//find all posts that user who has signed in has created

dashboard.get('/', withAuth, async (req, res) => {
    try {
        const dbPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                { model: User, attributes: ['username'] },
            ]

        });
        const posts = dbPosts.map((post) =>
            post.get({ plain: true })
        );
        console.log(posts);
        res.render('dashboard', { posts, loggedIn: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//edit existing post
dashboard.post('/edit/:id', withAuth, async (req, res) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})




//edit existing post
module.exports = dashboard;