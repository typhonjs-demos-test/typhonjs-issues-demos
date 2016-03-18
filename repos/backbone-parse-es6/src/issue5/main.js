/**
 * Provides the main entry point to the web app first invoking `typhonjs-core-parse-init` which is a component mapped
 * via `package.json->jspm->dependencies`. `typhonjs-core-parse-init` will initialize the Parse API by
 * loading `production-config.js` which is mapped to `parseconfig` in `config-app-paths.js`. Please see `index.html`
 * and notice that `config-app-paths.js` is loaded after `config.js` is loaded.
 *
 * This demo for backbone-parse-es6 Issue #5 (https://github.com/typhonjs/backbone-parse-es6/issues/5) shows that it is
 * now possible to directly set one or more Backbone.Model instances and have them properly serialize the backing
 * Parse.Object as a Parse.Pointer in addition to deserializing and reconstructing a new instance of the given
 * Backbone.Model. Take note that in ES6 extended classes you can now provide a getter method for `subclass` or
 * provide `options.subClass` setting it to an constructor function / ES6 class. This will automatically register
 * the given className with the subClass provided with `Parse.Object.registerSubclass()`.
 *
 * This app is simple and alternates between creating a single row in Issue5Comment, Issue5Post, Issue5Task tables
 * locally saving just the comment and subsequently the post and task via Parse.Pointers. On the next load it will
 * load the single comment and verify that the post and task are set correctly with the proper values.
 */

'use strict';

/* eslint-disable no-console */

import               'typhonjs-core-parse-init';

import $             from 'jquery';

import CommentModel  from './model/CommentModel.js';
import PostModel     from './model/PostModel.js';
import TaskModel     from './model/TaskModel.js';

import commentCollection   from './collection/CommentCollection.js';

const s_ITEM_UL = $('.Items');

const s_POST_MSG = (message) =>
{
   console.log(message);
   s_ITEM_UL.append($('<li>').text(message));
};

const s_CLEAR_MSG = () =>
{
   s_ITEM_UL.empty();
};

const s_ADD_DATA = () =>
{
   s_CLEAR_MSG();

   s_POST_MSG(`s_ADD_DATA - commentCollection.length: ${commentCollection.length}`);

   if (commentCollection.length > 0)
   {
      s_POST_MSG(`Data has already been added.`);
   }
   else
   {
      s_POST_MSG(`Adding post, comment & task.`);

      const post = new PostModel({ text: 'My post' });

      const task = new TaskModel({ text: 'My task' });

      const comment = new CommentModel({ text: 'My comment' });
      comment.set('parent', post);
      comment.set('task', task);

      comment.save().then(() =>
      {
         commentCollection.add(comment);

         s_POST_MSG(`Comment saved with parent post & task.`);

         s_POST_MSG(`comment attributes: ${Object.keys(comment.attributes)}`);
         s_POST_MSG(`comment _parseObjectId: ${comment.attributes['_parseObjectId']}`);
         s_POST_MSG(`comment id: ${comment.id}`);

         s_POST_MSG(`comment.get('parent') instanceof PostModel: ${comment.get('parent') instanceof PostModel}`);
         s_POST_MSG(`comment.get('parent') === post: ${comment.get('parent') === post}`);
         s_POST_MSG(`comment.get('task') instanceof TaskModel: ${comment.get('task') instanceof TaskModel}`);
         s_POST_MSG(`comment.get('task') === task: ${comment.get('task') === task}`);

         s_POST_MSG(`post attributes: ${Object.keys(post.attributes)}`);
         s_POST_MSG(`post _parseObjectId: ${post.attributes['_parseObjectId']}`);
         s_POST_MSG(`post id: ${post.id}`);

         s_POST_MSG(`task attributes: ${Object.keys(task.attributes)}`);
         s_POST_MSG(`task _parseObjectId: ${task.attributes['_parseObjectId']}`);
         s_POST_MSG(`task id: ${task.id}`);
      });
   }
};

const s_CREATE_DATA = () =>
{
   s_CLEAR_MSG();

   s_POST_MSG(`s_CREATE_DATA - commentCollection.length: ${commentCollection.length}`);

   if (commentCollection.length > 0)
   {
      s_POST_MSG(`Data has already been created.`);
   }
   else
   {
      s_POST_MSG(`Creating post, comment & task.`);

      const post = new PostModel({ text: 'My post' });

      const task = new TaskModel({ text: 'My task' });

      const comment = commentCollection.create({ text: 'My Comment', parent: post, task });

      s_POST_MSG(`Comment saved with parent post & task.`);

      s_POST_MSG(`comment attributes: ${Object.keys(comment.attributes)}`);
      s_POST_MSG(`comment _parseObjectId: ${comment.attributes['_parseObjectId']}`);
      s_POST_MSG(`comment id: ${comment.id}`);

      s_POST_MSG(`comment.get('parent') instanceof PostModel: ${comment.get('parent') instanceof PostModel}`);
      s_POST_MSG(`comment.get('parent') === post: ${comment.get('parent') === post}`);
      s_POST_MSG(`comment.get('task') instanceof TaskModel: ${comment.get('task') instanceof TaskModel}`);
      s_POST_MSG(`comment.get('task') === task: ${comment.get('task') === task}`);

      s_POST_MSG(`post attributes: ${Object.keys(post.attributes)}`);
      s_POST_MSG(`post _parseObjectId: ${post.attributes['_parseObjectId']}`);
      s_POST_MSG(`post id: ${post.id}`);

      s_POST_MSG(`task attributes: ${Object.keys(task.attributes)}`);
      s_POST_MSG(`task _parseObjectId: ${task.attributes['_parseObjectId']}`);
      s_POST_MSG(`task id: ${task.id}`);
   }
};

const s_DELETE_DATA = () =>
{
   s_CLEAR_MSG();

   if (commentCollection.length === 0)
   {
      s_POST_MSG(`No data to delete.`);
   }
   else
   {
      s_POST_MSG(`Attempting to delete data.`);

      try
      {
         const comment = commentCollection.models[0];

         s_POST_MSG(`comment attributes: ${Object.keys(comment.attributes)}`);
         s_POST_MSG(`comment _parseObjectId: ${comment.attributes['_parseObjectId']}`);
         s_POST_MSG(`comment id: ${comment.id}`);
         s_POST_MSG(`comment.text: ${comment.get('text')}`);

         const post = comment.get('parent');

         s_POST_MSG(`post attributes: ${Object.keys(post.attributes)}`);
         s_POST_MSG(`post _parseObjectId: ${post.attributes['_parseObjectId']}`);
         s_POST_MSG(`post id: ${post.id}`);
         s_POST_MSG(`post.text: ${post.get('text')}`);

         const task = comment.get('task');

         s_POST_MSG(`task attributes: ${Object.keys(task.attributes)}`);
         s_POST_MSG(`task _parseObjectId: ${task.attributes['_parseObjectId']}`);
         s_POST_MSG(`task id: ${task.id}`);
         s_POST_MSG(`task.text: ${task.get('text')}`);

         Promise.all([post.destroy(), task.destroy(), comment.destroy()]).then(() =>
         {
            s_POST_MSG(`Post, task & comment destroyed.`);
         });
      }
      catch (err)
      {
         s_POST_MSG(`ERROR: ${err}.`);
      }
   }
};

const s_FETCH_DATA = () =>
{
   if (commentCollection.length === 0)
   {
      commentCollection.fetch().then(() =>
      {
         s_CLEAR_MSG();
         s_POST_MSG(`Fetching comment, post, task.`);
         s_SHOW_DATA();
      });
   }
   else
   {
      s_CLEAR_MSG();
      s_SHOW_DATA();
   }
};

const s_SHOW_DATA = () =>
{
   if (commentCollection.length === 0)
   {
      s_POST_MSG(`No data to show.`);
   }
   else
   {
      s_POST_MSG(`Showing comment, post, task.`);

      try
      {
         const comment = commentCollection.models[0];

         s_POST_MSG(`comment attributes: ${Object.keys(comment.attributes)}`);
         s_POST_MSG(`comment _parseObjectId: ${comment.attributes['_parseObjectId']}`);
         s_POST_MSG(`comment id: ${comment.id}`);
         s_POST_MSG(`comment.text: ${comment.get('text')}`);

         const post = comment.get('parent');

         s_POST_MSG(`post attributes: ${Object.keys(post.attributes)}`);
         s_POST_MSG(`post _parseObjectId: ${post.attributes['_parseObjectId']}`);
         s_POST_MSG(`post id: ${post.id}`);
         s_POST_MSG(`post.text: ${post.get('text')}`);

         const task = comment.get('task');

         s_POST_MSG(`task attributes: ${Object.keys(task.attributes)}`);
         s_POST_MSG(`task _parseObjectId: ${task.attributes['_parseObjectId']}`);
         s_POST_MSG(`task id: ${task.id}`);
         s_POST_MSG(`task.text: ${task.get('text')}`);
      }
      catch (err)
      {
         s_POST_MSG(`ERROR: ${err}.`);
      }
   }
};

commentCollection.fetch().then(() =>
{
   s_POST_MSG('Comment collection initialized.');

   $("#add").click(() => { s_ADD_DATA(); });
   $("#create").click(() => { s_CREATE_DATA(); });
   $("#delete").click(() => { s_DELETE_DATA(); });
   $("#fetch").click(() => { s_FETCH_DATA(); });
});