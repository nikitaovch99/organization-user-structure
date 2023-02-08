import { User, UserInterface } from '../model/user.js';

export function getAll(userId = null) {

  if (userId) {
    return User.findAll({
      where: { bossId: userId },
      order: [
        'createdAt',
      ]
    });
  }

  return User.findAll({
    order: [
      'createdAt'
    ]
  });

}

export function getById(userId: number) {
  return User.findByPk(userId);
}

export function create(name: string, email: string, password: string, bossId: number) {
  
  return User.create({
    name, email, password, bossId,
  });
}

export function findByEmail(email: number) {
  return User.findOne({ where: { email } });
}


export function update(id: number, name: string, value: any) {
  return User.update({[name]: value}, {
    where: {id}
  });
}

export function normalize({id, name, email, bossId, role}: UserInterface) {
  return {id, name, email, bossId, role};
}