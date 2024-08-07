import adminModel from "../models/admin.model.js";

export const validationsRegister = async (data) => {
    const errors = {};
    // Validación de campos obligatorios
    if (!data.personalName) {
        errors.personalName = 'El nombre personal es obligatorio';
    }
    if (!data.personalEmail) {
        errors.personalEmail = 'El correo electrónico personal es obligatorio';
    }
    if (!data.personalPhone) {
        errors.personalPhone = 'El teléfono personal es obligatorio';
    }
    if (!data.password) {
        errors.password = 'La contraseña es obligatoria';
    }
    if (!data.brandName) {
        errors.brandName = 'El nombre de la marca es obligatorio';
    }
    if (!data.brandEmail) {
        errors.brandEmail = 'El correo electrónico de la marca es obligatorio';
    }
    if (!data.brandPhone) {
        errors.brandPhone = 'El teléfono de la marca es obligatorio';
    }
    if (!data.brandLocation) {
        errors.brandLocation = 'La ubicación de la marca es obligatoria';
    }
    if (!data.costDelivery) {
        errors.costDelivery = 'El costo de envío es obligatorio';
    }
    if (!data.brandInstagram) {
        errors.brandInstagram = 'La cuenta de Instagram de la marca es obligatoria';
    }

    // Validación de formato de correo electrónico
    if (data.personalEmail && !validations.validateEmail(data.personalEmail)) {
        errors.personalEmail = 'El formato de correo electrónico es inválido';
    }

    async function validateUniqueField(fieldName, fieldValue, errorMessage) {
        try {
            const existingRecord = await adminModel.findOne({ [fieldName]: fieldValue });
            if (existingRecord) {
                errors[fieldName] = errorMessage;
            }
        } catch (error) {
            errors[fieldName] = `Error al verificar la disponibilidad de ${fieldName}`;
        }
    }

    // Validación de correos electrónicos únicos
    if (data.personalEmail) {
        await validateUniqueField('personalEmail', data.personalEmail, 'El correo electrónico personal ya está registrado');
    }

    if (data.brandEmail) {
        await validateUniqueField('brandEmail', data.brandEmail, 'El correo electrónico de la marca ya está registrado');
    }

    // Validación de números de teléfono únicos
    if (data.personalPhone) {
        await validateUniqueField('personalPhone', data.personalPhone, 'El número de celular personal ya se encuentra registrado');
    }

    if (data.brandPhone) {
        await validateUniqueField('brandPhone', data.brandPhone, 'El número de celular de la marca ya se encuentra registrado');
    }

    if (data.brandName) {
        await validateUniqueField('brandName', data.brandName, 'El nombre de la marca ya se encuentra registrado');
    }


    // Validación de formato de teléfono
    if (data.personalPhone && !validations.validatePhone(data.personalPhone)) {
        errors.personalPhone = 'El formato de teléfono es inválido';
    }

    // Validación de contraseña
    if (data.password && !validations.validatePassword(data.password)) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres y contener al menos un número y un carácter especial';
    }

    // Validación de nombre de marca
    if (data.brandName && !validations.validateBrandName(data.brandName)) {
        errors.brandName = 'El nombre de la marca debe tener al menos 3 caracteres';
    }

    // Validación de ubicación de marca
    if (data.brandLocation && !validations.validateBrandLocation(data.brandLocation)) {
        errors.brandLocation = 'La ubicación de la marca debe tener al menos 3 caracteres';
    }

    // Validación de costo de envío
    if (data.costDelivery && !validations.validateCostDelivery(data.costDelivery)) {
        errors.costDelivery = 'El costo de envío debe ser un número positivo';
    }

    // Validación de cuenta de Instagram
    if (data.brandInstagram && !validations.validateBrandInstagram(data.brandInstagram)) {
        errors.brandInstagram = 'La cuenta de Instagram de la marca es válida';
    }
    if (Object.keys(errors).length > 0) {
        console.log(errors);
        if (!errors) {
            throw new Error('No se encontraron errores de validación');
        }
        console.log(errors);
        const error = new Error('Error en validación');
        error.errors = errors; // Adjunta el objeto de errores al error
        throw error;
    }

};



// Funciones de validación

const validations = {
    validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    },
    validatePhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    },
    validatePassword(password) {
        const re = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&*()_+=-{};:'<>,./?]).{8,}$/;
        return re.test(password);
    },
    validateBrandName(brandName) {
        return brandName.length >= 3;
    },
    validateBrandLocation(brandLocation) {
        return brandLocation.length >= 3;
    },
    validateCostDelivery(costDelivery) {
        return typeof costDelivery === 'number' && costDelivery > 0;
    },
    validateBrandInstagram(brandInstagram) {
        return typeof brandInstagram === 'string';
    }
}
