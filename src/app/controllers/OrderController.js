import * as Yup from "yup";
import Order from "../schemas/Order";
import Products from "../models/Products";
import Category from "../models/Category";

class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      product: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { products } = req.body;

    const productsIds = products.map((product) => product.id);
    const findProducts = await Products.findAll({
      where: {
        id: productsIds,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const formatedProducts = findProducts.map((products) => {
      const productIndex = products.findIndex(
        (item) => item.id === products.id
      );

      const newProducts = {
        id: products.id,
        name: products.name,
        category: products.category.name,
        price: products.price,
        url: products.url,
        quantity: products[productIndex].quantity,
      };
      return newProducts;
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formatedProducts,
      status: "Pedido Realizado",
    };

    const createdOrder = await Order.create(order);

    return res.status(201).json({ order });
  }
}

export default new OrderController();
