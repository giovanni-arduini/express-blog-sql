const express = require("express");
const router = express.Router();
const posts = require("../data/posts.js");
const postController = require("../controllers/postController.js");

// router.param("id", (req, res, next, id) => {
//   console.log("param id:", id);

//   req.params.id === parseInt(id);

//   const post = posts.find((post) => post.id === req.params.id);

//   if (post) {
//     req.post = post;
//     next();
//   } else {
//     res.status(404);
//     res.json({
//       from: "middleware",
//       error: "not found",
//       message: "Pagina non trovata",
//     });
//   }
// });

//index
router.get("/", postController.index);

//show
router.get(
  "/:id([0-9]+)",
  (req, res, next) => {
    req.params.id = parseInt(req.params.id);
    next();
  },
  postController.show
);

router.get(
  "/:category",
  (req, res) => {
    const post = posts.filter((post) => post.category === req.params.category);
    res.json(post);
  }
  // postController.show("category")
);

// router.get("/:id([0-9]+)", (req, res) => {
//   res.json({
//     id: req.params.id,
//   });
// });

// router.get("/:category", (req, res) => {
//   res.json({
//     category: req.params.category,
//   });
// });

//show
// router.get("/:identifier", postController.show);

//store
router.post("/", postController.store);

//update
router.put("/:id", postController.update);

//modify
router.patch("/:id", postController.modify);

//destroy
router.delete("/:id", postController.destroy);

module.exports = router;
