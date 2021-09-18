import express from 'express';
import { createCompany, listCompanies } from './companyController.js'
import { legitCompanyDataProtect,createCompanyProtect,editCompanyDataProtect,viewCompanyDataProtect } from './companyMiddleware.js'
const router = express.Router()

router.route('/').post(createCompanyProtect, legitCompanyDataProtect, createCompany).get(viewCompanyDataProtect, listCompanies);
// router.route('/:id').get(userAdminProtect, getCompany).delete(protect, userAdminProtect, deleteUser);



export default router;