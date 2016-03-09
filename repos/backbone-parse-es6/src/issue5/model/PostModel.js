'use strict';

import Backbone from 'backbone';

/**
 * Provides a basic Backbone.Model for a post. The post is added to the comment created in `main.js`.
 */
export default class PostModel extends Backbone.Model
{
   /**
    * Returns the `className` which is the table stored in Parse.
    *
    * @returns {string}
    */
   get className() { return 'Issue5Post'; }
}