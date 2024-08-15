import * as Yup from 'yup';
import Products from '../models/Products';

class ProductController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { filename: path } = req.file;

    console.log(path);
    const { name, price, category } = req.body;

    const products = await Products.create({
      name,
      price,
      category,
      path,
    });

    return res.status(201).json({ products });
  }

  async index(req, res) {
    const products = await Products.findAll();

    return res.json(products);
  }
}

export default new ProductController();
