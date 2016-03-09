'use strict';

import Backbone      from 'backbone';
import CommentModel  from '../model/CommentModel.js';

import Parse         from 'parse';

const s_QUERY = new Parse.Query(CommentModel);

//const s_QUERY = new Backbone.Query(CommentModel);


s_QUERY.include('parent');
s_QUERY.include('task');
s_QUERY.limit(1);

/**
 * Provides a basic `Backbone.Collection` using CommentModel
 */
class CommentCollection extends Backbone.Collection
{
   /**
    * Reference to this collection's model.
    *
    * @returns {MyModel}
    */
   get model() { return CommentModel; }

   get query() { return s_QUERY; }
}

/**
 * Exports an instance of CommentCollection.
 */
export default new CommentCollection();