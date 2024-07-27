import Admin from '../models/admin.model.js';
import { validationsRegister } from '../utils/validations.utils.js'
import bcrypt from 'bcrypt';

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
            if (errors) {
                if (Object.keys(errors).length > 0) {
                    throw new Error(errors);
                }
            }

            // Hashear password
            const hashedPassword = await this.hashPassword(password);

            // Registrar el administrador en la base de datos
            const admin = new Admin({
                personalName,
                personalEmail,
                personalPhone,
                password: hashedPassword,
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

    async hashPassword(password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async login(email, password) {
        try {
            // Buscar el administrador por el correo electrónico
            const admin = await Admin.findOne({ personalEmail: email });
            if (!admin) {
                throw new Error('Invalid email or password');
            }

            // Verificar la contraseña
            const isMatch = bcrypt.compare(password, admin.password);
            if (!isMatch) {
                throw new Error('Invalid email or password');
            }

            return admin;
        } catch (error) {
            console.error('Error logging in admin:', error);
            throw error;
        }
    }
}

export default new AdminServices();