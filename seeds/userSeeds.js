//import model
const { User } = require('../models');

//data to be seeded
const userData = [
    {
        username: 'sweetrolls',
        password: 'Lm9&Ci7e'
    },
    {
        username: 'algollogthehustler',
        password: 'nLYx0&X2bn7%Ff'
    },
    {
        username: 'beforesunsetglacier',
        password: 'ka3BUp2f$uuicZZe*l2CDhW'
    },
    {
        username: 'pathsofglorytortoise',
        password: '1S&jxyF!XSRs47G8hN*%a$7E#AkXWAwM'
    }

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
