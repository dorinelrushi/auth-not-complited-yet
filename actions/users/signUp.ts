'use server'
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../utilis/prisma';

export const signUp = async (email: string, password: string, username: string) => {
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        return 'User with that email already exists.';
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await prisma.users.create({
        data: {
            email,
            password: passwordHash, // Store the hashed password
            username, // Include the username
        },
    });

    return "Successfully created new user!";
};
