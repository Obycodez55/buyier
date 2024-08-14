import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.addColumn('Merchants', 'emailVerificationCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Merchants', 'passwordResetCode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.removeColumn('Merchants', 'emailVerificationCode');
    await queryInterface.removeColumn('Merchants', 'passwordResetCode');
  }
};