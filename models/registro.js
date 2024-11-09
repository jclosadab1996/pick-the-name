const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');  // Para encriptar contraseñas

// Definimos el esquema de usuario
const registroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Elimina espacios en blanco al principio y final
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Asegura que el correo electrónico sea único
    lowercase: true,  // Convierte el correo a minúsculas
    match: [/\S+@\S+\.\S+/, 'Por favor ingrese un correo válido'],  // Valida el formato del correo
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Mínimo de 6 caracteres
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Fecha por defecto al momento de la creación
  },
});

// // Middleware para encriptar la contraseña antes de guardarla
// registroSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {  // Solo encripta si la contraseña ha sido modificada
//     const salt = await bcrypt.genSalt(10);  // Genera el "salt"
//     this.password = await bcrypt.hash(this.password, salt);  // Encripta la contraseña
//   }
//   next();
// });

// // Método para comparar contraseñas durante el inicio de sesión
// registroSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };


module.exports = mongoose.model('registro', registroSchema);
