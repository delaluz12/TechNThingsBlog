const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //make sure there is at least 8 chars in password
                min: 2,
            }
        }
    },
    {
        hooks: {
            //before creating user in db it encrypts password to not store it in plain-text
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeBulkCreate: async (users) => {
                //loop thru array for users to grab the password
                for (const user of users) {
                    const {
                        password
                    } = user;
                    //hash password
                    var saltRounds = 10;
                    var salt = bcrypt.genSaltSync(saltRounds);
                    var hash = await bcrypt.hashSync(password, salt);
                    user.password = hash;
                }
                //return user with hashed password
                return User;


            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;