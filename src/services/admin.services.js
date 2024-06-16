import Admin from '../models/admin.model.js';
import { validationsRegister } from '../utils/validations.utils.js'

class AdminServices {
    async register({
        personalName,
        personalEmail,
        personalPhone,
        password,
        brandName,
        brandEmail,
        brandPhone,
        brandLocation,
        costDelivery,
        brandInstagram
    }) {
        try {
            // Agregar validaciones
            const errors = await validationsRegister({
                personalName,
                personalEmail,
                personalPhone,
                password,
                brandName,
                brandEmail,
                brandPhone,
                brandLocation,
                costDelivery,
                brandInstagram
            });
            console.log(errors);
            if(errors){
                if (Object.keys(errors).length > 0) {
                    throw new Error(errors);
                }
            }

            // Registrar el administrador en la base de datos
            const admin = new Admin({
                personalName,
                personalEmail,
                personalPhone,
                password,
                brandName,
                brandEmail,
                brandPhone,
                brandLocation,
                costDelivery,
                brandInstagram
            });
            await admin.save();
            console.log(admin);
            return admin;
        } catch (error) {
            console.error('Error registering admin:', error);
            throw error;
        }
    }
}


export default new AdminServices();
