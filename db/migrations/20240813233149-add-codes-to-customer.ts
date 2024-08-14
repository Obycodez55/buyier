import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('Customers', 'emailVerificationCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Customers', 'passwordResetCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn('Customers', 'emailVerificationCode');
    await queryInterface.removeColumn('Customers', 'passwordResetCode');
  }
};