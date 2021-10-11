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
            ],
            order: [
                ['created_at', 'DESC'],
            ],

        });
        const posts = dbPosts.map((post) =>
            post.get({ plain: true })
        );
        // console.log(posts);
        res.render('dashboard', { posts, loggedIn: req.session.logged_in });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//edit existing post
dashboard.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dbData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        });


        const post = dbData.get({ plain: true });
        res.render('editPost', { post, loggedIn: req.session.logged_in });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//render form for new post upon clicking 'create post' btn
dashboard.get('/new', withAuth, (req, res) => {
    try {
        res.render('newPost', {loggedIn: req.session.logged_in})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})





module.exports = dashboard;