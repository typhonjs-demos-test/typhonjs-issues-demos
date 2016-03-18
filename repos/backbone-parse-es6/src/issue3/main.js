/**
 * Provides the main entry point to the web app first invoking `parseinit` which is a component mapped via
 * `package.json->jspm->dependencies` to `typhonjs-core-parse-init`. `parseinit` will initialize the Parse API by
 * loading `production-config.js` which is mapped to `parseconfig` in `config-app-paths.js`. Please see `indexSrc.html`
 * and notice that `config-app-paths.js` is loaded after `config.js` is loaded.
 */

'use strict';

/* eslint-disable no-console */

import               'parseinit';

import $             from 'jquery';
import Parse         from 'parse';

import myCollection  from 'MyCollection.js';

myCollection.query = new Parse.Query(myCollection.model);
myCollection.query.ascending("createdAt");
myCollection.query.limit(5);
myCollection.fetch().then(() =>
{
   const itemsUL = $('.Items');

   myCollection.models.forEach((model) =>
   {
      console.log(`Model text: ${model.get('Text')}`);
      itemsUL.append($('<li>').text(model.get('Text')));
   });
});