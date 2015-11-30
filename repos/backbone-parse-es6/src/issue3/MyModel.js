'use strict';

import Backbone from 'backbone';

/**
 * Provides a basic `Backbone.Model` which is associated with the `Issue3` class / table stored in Parse.
 */
export default class MyModel extends Backbone.Model
{
   /**
    * Returns the `className` which is the table stored in Parse.
    *
    * @returns {string}
    */
   get className() { return 'Issue3'; }
}