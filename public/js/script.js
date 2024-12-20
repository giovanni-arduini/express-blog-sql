fetch("http://localhost:3000/posts")
  .then((resp) => {
    return resp.json();
  })
  .then((posts) => {
    console.log(posts);
  });
