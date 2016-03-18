/**
 * Loads mapped paths for TyphonJS in the browser and via Gulp / Node.js allowing normalized dependencies to be
 * used in defining further mapped paths.
 */
/* eslint-disable */

var System = System || global.System;

System.config(
{
   map:
   {
      'parseconfig': 'src/issue5/config/production-config.js'
   }
});