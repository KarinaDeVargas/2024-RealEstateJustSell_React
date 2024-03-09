module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define("payment", {
    PaymentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    propertiesPropertyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return payment;
};
