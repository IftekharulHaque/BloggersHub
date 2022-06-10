const { getNews,createNews,updateNews,deleteNews } = require("./news.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/",  getNews);
router.post("/", createNews);
router.patch("/", updateNews);
router.delete("/", deleteNews);

module.exports = router;