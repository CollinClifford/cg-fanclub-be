/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const posts = require("../fixtures/posts");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE posts RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert(posts);
    });
};
