import Sequelize, { Model } from "sequelize";

class Products extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,

        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  }
}

export default Products;
