require('dotenv').config();
const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
      console.log('[Database] Conectado a:', mongoose.connection.name);
    } catch (error) {
      console.error('[Database] Error de conexión:', error);
    }
  },
  handleDisconnect: async (req, res) => {
    await mongoose.disconnect();
    console.log('[Database] ¡Nos desconectamos a la BD!');
    return;
  },
};
