import { HTTP_STATUS } from "../constants/api.constants.js";
import adminServices from "../services/admin.services.js";

class AdminController {
    async register(req, res) {
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

            const admin = await adminServices.register({
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
            console.log('admin: ' + admin);
            // Devolver una respuesta exitosa
            res.status(HTTP_STATUS.CREATED).json({
                message: 'Administrador registrado con éxito',
                admin: admin
            });
        } catch (error) {
            // Manejar errores de validación
            if (error.message === 'Error en validación' && error.errors) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: 'Error en validación',
                    errors: error.errors
                });
            } else {
                // Manejo de otros errores
                res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                    message: 'Error interno del servidor',
                    error: error.message
                });
            }
        }
    }
}

export default new AdminController();
