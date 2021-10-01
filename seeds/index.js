//import sequelize  connection to db & db models
const sequelize = require('../config/connection');

//import seed files
const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const seedAll = async () => {
    //sync db
    await sequelize.sync({force: true});
    //start seeding db
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

    //EXIT 
    process.exit(0);
};

//run script
seedAll();