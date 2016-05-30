/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule flattenChildren
 */

'use strict';

var traverseAllChildren = require('./traverseAllChildren');
var warning = require('fbjs/lib/warning');

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 */
function flattenSingleChildIntoContext(traverseContext, child, name) {
  // We found a component instance.
  var result = traverseContext;
  var keyUnique = result[name] === undefined;
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : undefined;
  }
  if (keyUnique && child != null) {
    result[name] = child;
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children) {
  if (children == null) {
    return children;
  }
  var result = {};
  traverseAllChildren(children, flattenSingleChildIntoContext, result);
  return result;
}

module.exports = flattenChildren;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL2ZsYXR0ZW5DaGlsZHJlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVdBOztBQUVBLElBQUksc0JBQXNCLFFBQVEsdUJBQVIsQ0FBdEI7QUFDSixJQUFJLFVBQVUsUUFBUSxrQkFBUixDQUFWOzs7Ozs7O0FBT0osU0FBUyw2QkFBVCxDQUF1QyxlQUF2QyxFQUF3RCxLQUF4RCxFQUErRCxJQUEvRCxFQUFxRTs7QUFFbkUsTUFBSSxTQUFTLGVBQVQsQ0FGK0Q7QUFHbkUsTUFBSSxZQUFZLE9BQU8sSUFBUCxNQUFpQixTQUFqQixDQUhtRDtBQUluRSxNQUFJLFFBQVEsR0FBUixDQUFZLFFBQVosS0FBeUIsWUFBekIsRUFBdUM7QUFDekMsWUFBUSxHQUFSLENBQVksUUFBWixLQUF5QixZQUF6QixHQUF3QyxRQUFRLFNBQVIsRUFBbUIsdUVBQXVFLHVFQUF2RSxHQUFpSiwrQkFBakosRUFBa0wsSUFBck0sQ0FBeEMsR0FBcVAsU0FBclAsQ0FEeUM7R0FBM0M7QUFHQSxNQUFJLGFBQWEsU0FBUyxJQUFULEVBQWU7QUFDOUIsV0FBTyxJQUFQLElBQWUsS0FBZixDQUQ4QjtHQUFoQztDQVBGOzs7Ozs7O0FBaUJBLFNBQVMsZUFBVCxDQUF5QixRQUF6QixFQUFtQztBQUNqQyxNQUFJLFlBQVksSUFBWixFQUFrQjtBQUNwQixXQUFPLFFBQVAsQ0FEb0I7R0FBdEI7QUFHQSxNQUFJLFNBQVMsRUFBVCxDQUo2QjtBQUtqQyxzQkFBb0IsUUFBcEIsRUFBOEIsNkJBQTlCLEVBQTZELE1BQTdELEVBTGlDO0FBTWpDLFNBQU8sTUFBUCxDQU5pQztDQUFuQzs7QUFTQSxPQUFPLE9BQVAsR0FBaUIsZUFBakIiLCJmaWxlIjoiZmxhdHRlbkNoaWxkcmVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGZsYXR0ZW5DaGlsZHJlblxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IHBhc3NlZCB0aHJvdWdoIHRyYXZlcnNhbC5cbiAqIEBwYXJhbSB7P1JlYWN0Q29tcG9uZW50fSBjaGlsZCBSZWFjdCBjaGlsZCBjb21wb25lbnQuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWUgU3RyaW5nIG5hbWUgb2Yga2V5IHBhdGggdG8gY2hpbGQuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0KHRyYXZlcnNlQ29udGV4dCwgY2hpbGQsIG5hbWUpIHtcbiAgLy8gV2UgZm91bmQgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gIHZhciByZXN1bHQgPSB0cmF2ZXJzZUNvbnRleHQ7XG4gIHZhciBrZXlVbmlxdWUgPSByZXN1bHRbbmFtZV0gPT09IHVuZGVmaW5lZDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhrZXlVbmlxdWUsICdmbGF0dGVuQ2hpbGRyZW4oLi4uKTogRW5jb3VudGVyZWQgdHdvIGNoaWxkcmVuIHdpdGggdGhlIHNhbWUga2V5LCAnICsgJ2Alc2AuIENoaWxkIGtleXMgbXVzdCBiZSB1bmlxdWU7IHdoZW4gdHdvIGNoaWxkcmVuIHNoYXJlIGEga2V5LCBvbmx5ICcgKyAndGhlIGZpcnN0IGNoaWxkIHdpbGwgYmUgdXNlZC4nLCBuYW1lKSA6IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoa2V5VW5pcXVlICYmIGNoaWxkICE9IG51bGwpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBjaGlsZDtcbiAgfVxufVxuXG4vKipcbiAqIEZsYXR0ZW5zIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC4gQW55IG51bGxcbiAqIGNoaWxkcmVuIHdpbGwgbm90IGJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHRpbmcgb2JqZWN0LlxuICogQHJldHVybiB7IW9iamVjdH0gZmxhdHRlbmVkIGNoaWxkcmVuIGtleWVkIGJ5IG5hbWUuXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5DaGlsZHJlbihjaGlsZHJlbikge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge307XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZsYXR0ZW5TaW5nbGVDaGlsZEludG9Db250ZXh0LCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW5DaGlsZHJlbjsiXX0=