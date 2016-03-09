'use strict';

import Backbone   from 'backbone';

import PostModel  from './PostModel.js';
import TaskModel  from './TaskModel.js';

/**
 * Provides a basic Backbone.Model for comments. For testing Parse.Pointer conversion a PostModel and TaskModel are
 * set respectively to `parent` and `task` via `get subClasses`.
 */
export default class CommentModel extends Backbone.Model
{
   /**
    * Returns the `className` which is the table stored in Parse.
    *
    * @returns {string}
    */
   get className() { return 'Issue5Comment'; }


   /**
    * Returns the `subClasses` object hash for CommentModel which is registered with Parse.Object.
    *
    * @returns {{Issue5Post: PostModel, Issue5Task: TaskModel}}
    */
   get subClasses() { return { 'Issue5Post': PostModel, 'Issue5Task': TaskModel }; }
}