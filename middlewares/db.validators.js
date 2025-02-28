import User from '../src/user/user.model.js';

export const objectIdValid = async (objectId) => {
    if (!await isValidObjectId(objectId)) {
        throw new Error(`Id is not objectId valid`);
    }
}

export const findUser = async (id) => {
    try {
        const userExist = await User.findById(id)
        if (!userExist) return false
        return userExist
    } catch (e) {
        console.error(e)
        return false
    }
}