import { model, Schema } from "mongoose";

const companySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [1, 'Name cannot be empty'],
            maxLength: [15, 'Name cannot be overcome 15 characteres'],
        },
        legalName: {
            type: String,
            required: [true, 'Legal name is required'],
            trim: true,
            minLength: [1, 'Name cannot be empty'],
            maxLength: [20, 'Name cannot be overcome 20 characteres'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [1, 'Name cannot be empty'],
            maxLength: [60, 'Name cannot be overcome 50 characteres']
        },
        industry: {
            type: String,
            required: [true, 'Industry is required']
        },
        address: {
            street: String,
            city: String
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        yearOfExperience: {
            type: Number,
            required: [true, 'Year of experience']
        }
    }
);

export default model('Company', companySchema);