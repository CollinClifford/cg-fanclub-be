const service = require("./posts.service");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const hasRequiredProperties = hasProperties(
  "movie_name",
  "movie_year",
  "short_summary",
  "star_rating",
  "review",
  "imdb_link",
  "genres",
  "movie_img",
  "actors",
  "rating",
  "length"
);

async function postExists(req, res, next) {
  const post = await service.read(req.params.postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  next({ status: 404, message: `post ${req.params.postId} cannot be found.` });
}

const VALID_PROPERTIES = [
  "movie_name",
  "movie_year",
  "short_summary",
  "star_rating",
  "review",
  "imdb_link",
  "genres",
  "movie_img",
  "actors",
  "rating",
  "length",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

function read(req, res) {
  const { post: data } = res.locals;
  res.json({ data });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedPost = {
    ...req.body.data,
    post_id: res.locals.post.post_id,
  };
  const data = await service.update(updatedPost);
  res.json({ data });
}

async function destroy(req, res) {
  const { post } = res.locals;
  await service.delete(post.post_id);
  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(postExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(postExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
  
};
