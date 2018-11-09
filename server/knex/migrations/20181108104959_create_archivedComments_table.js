
exports.up = function (knex, Promise) {
    return knex.schema.createTable('archived_comments', function (table) {
      table.increments();
      table.string('body', 500).notNullable();
      table.integer("post_id").unsigned().notNullable();
      table.foreign('post_id').references('id').inTable('posts');
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users');
      table.boolean('is_approved').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  }
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable('archived_comments');
  }
