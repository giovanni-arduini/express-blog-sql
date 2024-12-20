const posts = require("../data/posts.js");
const notFound = require("../middlewares/notFound.js");

const connection = require("../data/db.js");

// Functions

//index

function index(req, res) {
  const sql = `SELECT * FROM posts`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json((error = "Database query failed"));
    } else {
      res.json(results);
    }
  });
}

// function index(req, res) {
//   const tag = req.query.tags;
//   let taggedPosts = posts;

//   console.log(taggedPosts);

//   if (tag) {
//     console.log(`Ecco la lista dei post con il tag: ${tag}`);

//     taggedPosts = posts.filter((post) => post.tags.includes(tag));
//     console.log(taggedPosts);
//   }

//   res.json({
//     posts: taggedPosts,
//     count: taggedPosts.length,
//   });
// }

//show

function show(identifier) {
  return (req, res) => {
    const post = posts.find(
      (post) => post[identifier] === req.params[identifier]
    );
    res.json(post);
  };
}

/*
function show(req, res) {
  console.log(req.post);
  // res.json(req.post);
}
*/

//OLD SHOW FUNCTION
// function show(identifier) {
// (req, res) => {
//   // const identifier = param === 'id' ? parseInt(req.params.id) : req.params.category;
//   console.log(identifier);
//   let post;

//   // console.log(`Ecco i post con identificativo ${identifier}`);

//   if (!isNaN(identifier)) {
//     let postIndex;
//     postIndex = parseInt(identifier);
//     post = posts.find((post) => post.id === postIndex);
//   } else {
//     post = posts.filter((post) => post.category.includes(`${identifier}`));
//   }

//   post = posts.find((post) => post[identifier] === req.params[identifier]);

// res.json(res.post);
// };
// }

//store
function store(req, res) {
  const newId = posts[posts.length - 1].id + 1;
  console.log(newId);
  console.log(req.body.category);

  if (
    !req.body.title ||
    !req.body.category ||
    !req.body.content ||
    // !req.body.image ||
    !req.body.tags
  ) {
    res.status(404);
    result = {
      error: "Invalid insert",
      mesasge: "Compila correttamente i campi del post",
    };
    res.json(result);
    return;
  }

  const newPost = {
    id: newId,
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  posts.push(newPost);
  console.log(newPost);

  res.status(201);
  res.json(newPost);
}

//modify
function modify(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Post not found",
      message: "Non è stato trovato alcun post con l'id specificato",
    });
  }

  const { title, category, content, image, tags } = req.body;

  if (title) post.title = title;
  if (category) post.category = category;
  if (content) post.content = content;
  if (image) post.image = image;
  if (tags) post.tags = tags;

  res.json(post);
}

//update
function update(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Post not found",
      message: "Non è stato trovato alcun post con l'id specificato",
    });
  }

  post.title = req.body.title;
  post.category = req.body.category;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;
  res.send(`Modifica il post con id: ${id}`);
  console.log(posts);
}

//destroy
function destroy(req, res) {
  const id = parseInt(req.params.id);

  const post = posts.findIndex((post) => post.id === id);
  console.log(post);

  if (!post) {
    res.status(404);
    result = {
      error: "Post not found",
      message: "Il post non è stato trovato",
    };
    res.send(result);

    return;
  }

  posts.splice(post, 1);

  console.log(posts);
  console.log(`Elimina il post con id ${id}`);
  res.sendStatus(204);
}

module.exports = { index, show, store, modify, update, destroy };
