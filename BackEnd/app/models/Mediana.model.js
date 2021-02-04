module.exports = (sequelize, Sequelize) => {
    const Mediana = sequelize.define("mediane", {
      mediana: {
        type: Sequelize.INTEGER
      }
    },{
        freezeTableName: true,
        updatedAt: false
      }
    );

    Mediana.sync()
  
    return Mediana
};