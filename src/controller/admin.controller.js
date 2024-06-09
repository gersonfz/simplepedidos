import { HTTP_STATUS } from "../constants/api.constants.js";
import { validationsRegister } from "../utils/validations.utils.js";
import Admin from '../models/admin.model.js';


class AdminController {
    async register(req, res, next) {
        try {
            const { personalName, 
                personalEmail, 
                personalPhone, 
                password, 
                brandName, 
                brandEmail, 
                brandPhone,
                brandLocation, 
                costDelivery, 
                brandInstagram } = req.body;

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

            if (Object.keys(errors).length > 0) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    errors
                });
                return;
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

            // Devolver una respuesta exitosa
            res.status(HTTP_STATUS.CREATED).json({
                message: 'Administrador registrado con éxito'
            });
        } catch (error) {
            // Manejar errores
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Error sign up'
            });
            return next(error);
        }
    }
}

export default new AdminController();
