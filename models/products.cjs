'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /**
       * 여기서 관계를 정의합니다.
       * `this`는 클래스 자체를 가리킵니다. `belongsTo()` 메서드를 사용하여 관계를 지정합니다.
       * 여기서 우리는 Users가 Products에 포함되어 있음을 정의하고, 나중에 쿼리할 때 'user'로 검색될 것입니다.
       * 반대로, 사용자 쪽에서도 관계를 설정해야 합니다.
       **/
      this.belongsTo(models.Users, { as: 'user' });
    }
  }
  Products.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Products',
    },
  );
  return Products;
};
