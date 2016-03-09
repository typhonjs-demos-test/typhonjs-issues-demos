'use strict';

import Backbone from 'backbone';

/**
 * Provides a basic Backbone.Model for a task. The task is added to the comment created in `main.js`.
 */
export default class TaskModel extends Backbone.Model
{
   /**
    * Returns the `className` which is the table stored in Parse.
    *
    * @returns {string}
    */
   get className() { return 'Issue5Task'; }
}