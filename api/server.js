require('dotenv').config();
const cors = require('cors');

const express = require('express');
const routes = require('./routes');
const dbSetup = require('./dbSetup');
const APP_PORT = process.env.APP_PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }));

routes(app);

(async () => {
  try {
    await dbSetup.connect();
    //await dbSetup.handleDisconnect();
  } catch (error) {
    console.error('Error al conectar y ejecutar el Seeder:', error);
  }
})();

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
