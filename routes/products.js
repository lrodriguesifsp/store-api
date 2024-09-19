const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET products listing. */
router.get("/", function (req, res, next) {
  prisma.product
    .findMany()
    .then((products) => {
      return res.json(products);
    })
    .catch((error) => {
      return res.json({ error: error.message });
    });
});

module.exports = router;
