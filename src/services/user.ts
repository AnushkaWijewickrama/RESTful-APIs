const User = require('../models/user');

export const getUsers = async () => {
    return await User.find();
};

export const createUser = async (userData: { firstname: string; lastname: string; email: string }) => {
    const user = new User(userData);
    return await user.save();
};
export const deleteUser = async (id: string) => {
    await User.deleteMany({ _id: id });
    return await User.find(); // Return the updated list of users
};
