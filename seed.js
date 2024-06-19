// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Role = require('./models/role');
const dotenv = require('dotenv');
dotenv.config();

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Función para crear un rol
async function createRole(name) {
  const role = new Role({ name });
  await role.save();
}

// Función para crear un usuario administrador
async function createAdminUser() {
  const adminRole = await Role.findOne({ name: 'admin' });

  if (!adminRole) {
    console.error('El rol de administrador no existe. Crea los roles primero.');
    process.exit(1);
  }

  const username = 'admin';
  const password = await bcrypt.hash('tu-contraseña', 10); // Cambia 'tu-contraseña' por la contraseña deseada

  const adminUser = new User({ username, password, role: adminRole });
  await adminUser.save();
}

// Crear roles
const rolesToCreate = ['admin', 'usuario','doctor','laboratorio']; // Puedes agregar más roles si es necesario

(async () => {
  for (const roleName of rolesToCreate) {
    await createRole(roleName);
  }

  // Crear usuario administrador
  await createAdminUser();

  console.log('Semillas creadas exitosamente.');
  process.exit(0);
})();
