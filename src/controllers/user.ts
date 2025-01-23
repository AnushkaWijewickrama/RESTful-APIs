import { Request, Response } from 'express';
import { createUser, getUsers, deleteUser } from '../services/user';

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Fetching users failed.' });
    }
};

export const postUser = async (req: Request, res: Response) => {
    const { firstname, lastname, email } = req.body;

    try {
        const createdUser = await createUser({ firstname, lastname, email });

        // Respond with the newly created user
        res.status(201).json({
            user: {
                ...createdUser._doc,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Creating user failed.' });
    }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const updatedUsers = await deleteUser(id);
        res.status(200).json(updatedUsers);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Deleting user failed.' });
    }
};