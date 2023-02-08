import { User } from '../model/user.js';
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
export function getById(userId) {
    return User.findByPk(userId);
}
export function create(name, email, password, bossId) {
    return User.create({
        name, email, password, bossId,
    });
}
export function findByEmail(email) {
    return User.findOne({ where: { email } });
}
export function normalize({ id, name, email, bossId, role }) {
    return { id, name, email, bossId, role };
}
