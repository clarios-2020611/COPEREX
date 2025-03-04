import { model, Schema } from "mongoose";

const userSchema = Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            minLength: [1, 'Username cannot be empty'],
            maxLength: [15, 'Username cannot be overcome 10 characteres']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is not valid']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
    }
);


export default model('User', userSchema);