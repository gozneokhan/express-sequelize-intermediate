/**
 * 데이터베이스와 통신할 때 사용되는 객체를 정의합니다.
 * 여기서 정의된 옵션들은 데이터베이스에 입력되기 전에 한 번의 validation 등에 사용됩니다.
 * ORM을 이용할 때 걸러지는 옵션입니다.
 * migrations와 동일한 옵션으로 지정되어야 합니다.
 **/

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /**
       * 사용자는 여러 상품을 가질 수 있으므로 hasMany() 메서드를 사용하여 관계를 정의합니다.
       * Products 모델의 userId를 외래 키로 사용하여 관계를 설정합니다.
       * 'products'로 쿼리를 실행할 때 결과값을 가져오기 위해 as 옵션을 설정합니다.
       */
      this.hasMany(models.Products, { foreignkey: 'userId', as: 'products' });
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
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
      modelName: 'Users',
    },
  );
  return Users;
};
