"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeUserModel = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
// User.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: DataTypes.ENUM('Administrator', 'Boss', 'Regular'),
//     defaultValue: 'Regular',
//   },
//   bossId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: 'id',
//     },
//   },
// }, {
//   sequelize,
//   modelName: 'user',
//   tableName: 'users',
// });
function initializeUserModel(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        bossId: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'user',
        tableName: 'users',
    });
}
exports.initializeUserModel = initializeUserModel;
User.belongsTo(User, {
    as: 'boss',
    foreignKey: 'bossId',
});
User.hasMany(User, {
    as: 'subordinates',
    foreignKey: 'bossId',
});
exports.default = User;
