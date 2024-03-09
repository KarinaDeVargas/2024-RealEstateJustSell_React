module.exports = (sequelize, DataTypes) => {
  const images = sequelize.define("images", {
    imageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPrimaryPicture: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return images;
};
