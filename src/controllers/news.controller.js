import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.doby;

    if (!title || !text || !banner) {
      res.status(400).send({
        message: "Subimit all fields for registration",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: req.userd,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  const news = await findAllService();
  const { limit, offset } = req.query;

  console.log(limit,offset)

  if (news.length === 0) {
    return res.status(400).send({
      message: "nao ha novos registros news",
    });
  }
  res.send(news);
};

export { create, findAll };
