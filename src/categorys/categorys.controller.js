import Category from './categorys.model.js';

export const createCategory = async (req, res) => {
    try {
        const data = req.body;
        let category = new Category(data);
        await category.save();
        return res.send({ success: false, message: 'Category saved successfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}

export const getAll = async (req, res) => {
    try {
        let { limit = 5, skip = 0 } = req.query;
        let categorys = await Category.find().limit(limit).skip(skip);
        if (!categorys) return res.status(404).send({ success: false, message: 'Categorys not found' });
        return res.send({ success: false, message: 'Category found', categorys });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ success: false, message: 'General error' });
    }
}