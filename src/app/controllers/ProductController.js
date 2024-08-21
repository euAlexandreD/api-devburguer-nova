import * as Yup from "yup";
import Products from "../models/Products";
import Category from "../models/Category";

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      categoryId: Yup.number().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { filename: path } = req.file;

    console.log(path);
    const { name, price, categoryId } = req.body;

    const products = await Products.create({
      name,
      price,
      categoryId,
      path,
    });

    return res.status(201).json({ products });
  }

  async index(req, res) {
    const products = await Products.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.json(products);
  }
}

export default new ProductController();
