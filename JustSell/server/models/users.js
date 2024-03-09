module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
    },
    streetNum: {
      type: DataTypes.MEDIUMINT,
    },
    streetName: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    postal: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRealtorApproved: {
      type: DataTypes.TINYINT,
    },
    realtorCertification: {
      type: DataTypes.STRING,
    },
  });
  users.associate = (models) => {
    users.hasMany(models.properties, {
      onDelete: "cascade",
    });

    users.hasMany(models.payment, {
      onDelete: "cascade",
    });
  };
  return users;
};
