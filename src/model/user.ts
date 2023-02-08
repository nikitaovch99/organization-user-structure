import { Model } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { DataTypes } from 'sequelize';

export enum Role {
  Administrator = 'Administrator',
  Boss = 'Boss',
  Regular = 'Regular',
}

export interface UserInterface {
  id: number,
  name: string,
  email: string,
  password: string,
  role: Role,
  bossId: number,
}

export type UserModel = Model & UserInterface;

export const User = sequelize.define<UserModel>('User', {
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
}
);
