//import router
const user = require('express').Router();

const { User, Post, Comment } = require('../../models');

//  chk if user exists in db for login & start session
user.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        console.log(userData);
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//create new user via sign-up route & start session
user.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.logged_in = true;
            res.status(200).json({ user: newUser, message: 'Logged In!' });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// destory session upon logout
user.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//get all users but not password
user.get('/', async (req, res) => {
    try {
        const Users = await User.findAll({
            attributes: { exclude: ['password'], includes: [{ model: Post }, { model: Comment }] },
        });
        res.status(200).json(Users);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//get User by ID
user.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'], includes: [{ model: Post }, { model: Comment }] }
        });
        if (!user) {
            res.status(400).json({ message: 'No user found with that ID' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//update user by ID
user.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        if (!updateUser) {
            res.status(400).json({ message: 'no User found with that ID' });
        }
        res.status(400).json({ updated: updateUser, message: 'Successfully updated' })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//delete User by ID 
user.delete('/:id', async (req, res) => {
    try {
        const delUser = await User.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!delUser) {
            res.status(400).json({ message: 'no User found with that ID' });
        }
        res.status(200).json({ message: 'succesfully deleted user' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = user;