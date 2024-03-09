module.exports = (sequelize, DataTypes) => {
  const properties = sequelize.define("properties", {
    propertyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    streetNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    furnished: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearOfBuilt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellOption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    constructionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "01ceecc1ee3cc7a478c7c56e03df15d115f40537cf9f6ebeed896f44392e4b10",
    },
  });
  properties.associate = (models) => {
    properties.hasMany(models.images, {
      onDelete: "cascade",
    });
    properties.hasOne(models.payment, {
      foreignKey: "propertiesPropertyID",
      as: "payment",
    });
    properties.belongsTo(models.users, {
      foreignKey: "userID",
      as: "user",
    });
  };

  return properties;
};
