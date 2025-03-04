import mongoose, { disconnect } from 'mongoose'
import { createUser } from '../src/user/user.controller.js';

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Could not be connect to mongodb')
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | try conecting')
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to mongodb')
        });
        mongoose.connection.once('open', () => {
            console.log('MongoDB | connected to database')
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to mongodb')
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected')
        });

        await mongoose.connect(
            `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
            {
                maxPoolSize: 50,
                serverSelectionTimeoutMS: 5000,
                heartbeatFrequencyMS: 2000
            }
        );

        await createUser();
    } catch (e) {
        console.error('Database connection failed', e);
    }
}