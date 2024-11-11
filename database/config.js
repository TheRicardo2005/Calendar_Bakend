const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('BD Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexión a la base de datos');
    }

}

module.exports = {
    dbConnection
}