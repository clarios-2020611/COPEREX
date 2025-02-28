'Use strict';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import UserRoutes from '../src/user/user.routes.js';
import CompanyRoutes from '../src/companies/companies.routes.js';
import CategorysRoutes from '../src/categorys/categorys.routes.js';

const configs = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(helmet());
    //app.use(limiter);
    app.use(morgan('dev'));
}

const routes = (app) => {
    app.use(UserRoutes);
    app.use('/Company', CompanyRoutes);
    app.use('/Category', CategorysRoutes);
}

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);
        app.listen(process.env.PORT);
        console.log(`Server running in port ${process.env.PORT}`);
    } catch (e) {
        console.error('Server init failed', e);
    }
}