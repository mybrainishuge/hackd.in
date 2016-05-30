/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getTextContentAccessor
 */

'use strict';

var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

module.exports = getTextContentAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL2dldFRleHRDb250ZW50QWNjZXNzb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXQTs7QUFFQSxJQUFJLHVCQUF1QixRQUFRLCtCQUFSLENBQXZCOztBQUVKLElBQUksYUFBYSxJQUFiOzs7Ozs7OztBQVFKLFNBQVMsc0JBQVQsR0FBa0M7QUFDaEMsTUFBSSxDQUFDLFVBQUQsSUFBZSxxQkFBcUIsU0FBckIsRUFBZ0M7OztBQUdqRCxpQkFBYSxpQkFBaUIsU0FBUyxlQUFULEdBQTJCLGFBQTVDLEdBQTRELFdBQTVELENBSG9DO0dBQW5EO0FBS0EsU0FBTyxVQUFQLENBTmdDO0NBQWxDOztBQVNBLE9BQU8sT0FBUCxHQUFpQixzQkFBakIiLCJmaWxlIjoiZ2V0VGV4dENvbnRlbnRBY2Nlc3Nvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBnZXRUZXh0Q29udGVudEFjY2Vzc29yXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpO1xuXG52YXIgY29udGVudEtleSA9IG51bGw7XG5cbi8qKlxuICogR2V0cyB0aGUga2V5IHVzZWQgdG8gYWNjZXNzIHRleHQgY29udGVudCBvbiBhIERPTSBub2RlLlxuICpcbiAqIEByZXR1cm4gez9zdHJpbmd9IEtleSB1c2VkIHRvIGFjY2VzcyB0ZXh0IGNvbnRlbnQuXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gZ2V0VGV4dENvbnRlbnRBY2Nlc3NvcigpIHtcbiAgaWYgKCFjb250ZW50S2V5ICYmIEV4ZWN1dGlvbkVudmlyb25tZW50LmNhblVzZURPTSkge1xuICAgIC8vIFByZWZlciB0ZXh0Q29udGVudCB0byBpbm5lclRleHQgYmVjYXVzZSBtYW55IGJyb3dzZXJzIHN1cHBvcnQgYm90aCBidXRcbiAgICAvLyBTVkcgPHRleHQ+IGVsZW1lbnRzIGRvbid0IHN1cHBvcnQgaW5uZXJUZXh0IGV2ZW4gd2hlbiA8ZGl2PiBkb2VzLlxuICAgIGNvbnRlbnRLZXkgPSAndGV4dENvbnRlbnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcbiAgfVxuICByZXR1cm4gY29udGVudEtleTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRUZXh0Q29udGVudEFjY2Vzc29yOyJdfQ==