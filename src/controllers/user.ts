import { Request, Response } from 'express';
const User = require('../models/user');

exports.getUser = async (req: Request, res: Response) => {
    const user = await User.find();
    res.status(200).json(user);
};

exports.postUser = async (req: Request, res: Response) => {
    const { firstname, lastname, email } = req.body;

    try {
        const user = new User({
            firstname,
            lastname,
            email
        });
        const createdUser = await user.save();

        // Respond with the newly created banner
        res.status(201).json({
            user: {
                ...createdUser._doc,
            },
        });
    } catch (error) {
        console.error('Error creating banner:', error);
        res.status(500).json({ message: 'Creating banner failed.' });
    }
};

exports.deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await User.deleteMany({ _id: id });
    res.status(201).json(await User.find());;

};