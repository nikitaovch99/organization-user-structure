import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';
export var Role;
(function (Role) {
    Role["Administrator"] = "Administrator";
    Role["Boss"] = "Boss";
    Role["Regular"] = "Regular";
})(Role || (Role = {}));
export const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Administrator', 'Boss', 'Regular'),
        defaultValue: 'Regular',
    },
    bossId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'createdAt',
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    modelName: 'user',
    tableName: 'users',
    updatedAt: false,
});
