import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { objectIdValid } from '../../middlewares/db.validators.js';
import Company from './companies.model.js';

export const addCompany = async (req, res) => {
    try {
        let data = req.body;
        let company = new Company(data);
        await company.save();
        return res.send({ success: true, message: `Save company successfully ${company.name}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getAll = async (req, res) => {
    try {
        let { limit = 5, skip = 0 } = req.query;
        let companies = await Company.find().limit(limit).skip(skip);
        if (!companies) return res.status(404).send({ success: false, message: 'Companies not found' });
        return res.send({ success: true, message: `Companies found ${companies}` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}


export const update = async (req, res) => {
    try {
        let { data, id } = req.body;
        objectIdValid(id);
        let company = await Company.findOneAndUpdate({ _id: id }, data, { new: true });
        if (!company) return res.status(404).send({ success: false, message: 'Company no found' });
        return res.send({ success: true, message: 'Company updated successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const exportCompaniesToExcel = async (req, res) => {
    try {
        const companies = await Company.find().populate('category', 'name');

        if (!companies.length) {
            return res.status(404).send({ success: false, message: 'Companies not found' });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Compañías");

        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Legal name", key: "legalName", width: 30 },
            { header: "Industry", key: "industry", width: 40 },
            { header: "Category", key: "category", width: 20 },
            { header: "Year of experience", key: "yearOfExperience", width: 30 }
        ];

        companies.forEach(company => {
            worksheet.addRow(company.toObject());
        });

        const dir = path.dirname(process.env.SAVE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        await workbook.xlsx.writeFile(process.env.SAVE_PATH);

        res.status(200).send({ success: true, message: `Reporte guardado en: ${process.env.SAVE_PATH}` });
    } catch (e) {
        console.error(e);
        res.status(500).send({ success: false, message: 'General error', e });
    }
};