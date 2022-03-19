/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("post_id").primary();
    table.string("movie_name");
    table.string("movie_year");
    table.string("short_summary");
    table.string("star_rating");
    table.string("review");
    table.string("imdb_link");
    table.string("genres");
    table.string("movie_img");
    table.text("actors");
    table.string("rating");
    table.string("length");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
