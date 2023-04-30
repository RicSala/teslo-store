import { db } from ".";
import { User } from "../models";
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async (email, password) => {

    await db.connect();
    // get the user whose email matches the email passed in
    const user = await User.findOne({ email }).lean()
    await db.disconnect();

    if (!user) { return null; }

    // check if the password passed in matches the password in the db
    const match = await bcrypt.compare(password, user.password)

    if (!match) { return null; }

    // return the user if the password matches
    const { role, name, _id } = user;

    return { role, name, email, _id };

}

// this functions verifies the oAuth user

export const checkOauthUser = async (oAuthemail, oAuthname) => {

    await db.connect();
    // get the user whose email matches the email passed in
    const user = await User.findOne({ email: oAuthemail }).lean()

    if (user) {
        await db.disconnect();
        const { role, name, email, _id } = user;
        return { role, name, email, _id };
    }

    // if the user does not exist, we create it
    const newUser = await User.create({
        name: oAuthname,
        email: oAuthemail,
        password: "@",
        role: "user"
    })

    await db.disconnect();

    const { role, name, email, _id } = newUser;
    return { role, name, email, _id }; // why not return newUser? because we don't want to return the some fields like password
}


// return an object with numberOfClients, numberOfUsers, numberOfAdmins
export const getNumberOfUsers = async () => {

    await db.connect();
    const numberOfUsers = await User.countDocuments();
    const numberOfClients = await User.countDocuments({ role: 'user' });
    const numberOfAdmins = await User.countDocuments({ role: 'admin' });
    await db.disconnect();

    // another, more eficient way to do this allowing parallel execution of the queries is using Promise.all
    // const [numberOfUsers, numberOfClients, numberOfAdmins] = await Promise.all([
    //     User.countDocuments(),
    //     User.countDocuments({ role: 'user' }),
    //     User.countDocuments({ role: 'admin' })
    // ])

    return { numberOfUsers, numberOfClients, numberOfAdmins };
}