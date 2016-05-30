/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */

'use strict';

var SyntheticEvent = require('./SyntheticEvent');

var getEventTarget = require('./getEventTarget');

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function view(event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target != null && target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function detail(event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NsaWVudC9saWIvcmVhY3QvbGliL1N5bnRoZXRpY1VJRXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUE7O0FBRUEsSUFBSSxpQkFBaUIsUUFBUSxrQkFBUixDQUFqQjs7QUFFSixJQUFJLGlCQUFpQixRQUFRLGtCQUFSLENBQWpCOzs7Ozs7QUFNSixJQUFJLG1CQUFtQjtBQUNyQixRQUFNLGNBQVUsS0FBVixFQUFpQjtBQUNyQixRQUFJLE1BQU0sSUFBTixFQUFZO0FBQ2QsYUFBTyxNQUFNLElBQU4sQ0FETztLQUFoQjs7QUFJQSxRQUFJLFNBQVMsZUFBZSxLQUFmLENBQVQsQ0FMaUI7QUFNckIsUUFBSSxVQUFVLElBQVYsSUFBa0IsT0FBTyxNQUFQLEtBQWtCLE1BQWxCLEVBQTBCOztBQUU5QyxhQUFPLE1BQVAsQ0FGOEM7S0FBaEQ7O0FBS0EsUUFBSSxNQUFNLE9BQU8sYUFBUDs7QUFYVyxRQWFqQixHQUFKLEVBQVM7QUFDUCxhQUFPLElBQUksV0FBSixJQUFtQixJQUFJLFlBQUosQ0FEbkI7S0FBVCxNQUVPO0FBQ0wsYUFBTyxNQUFQLENBREs7S0FGUDtHQWJJO0FBbUJOLFVBQVEsZ0JBQVUsS0FBVixFQUFpQjtBQUN2QixXQUFPLE1BQU0sTUFBTixJQUFnQixDQUFoQixDQURnQjtHQUFqQjtDQXBCTjs7Ozs7Ozs7QUErQkosU0FBUyxnQkFBVCxDQUEwQixjQUExQixFQUEwQyxjQUExQyxFQUEwRCxXQUExRCxFQUF1RSxpQkFBdkUsRUFBMEY7QUFDeEYsaUJBQWUsSUFBZixDQUFvQixJQUFwQixFQUEwQixjQUExQixFQUEwQyxjQUExQyxFQUEwRCxXQUExRCxFQUF1RSxpQkFBdkUsRUFEd0Y7Q0FBMUY7O0FBSUEsZUFBZSxZQUFmLENBQTRCLGdCQUE1QixFQUE4QyxnQkFBOUM7O0FBRUEsT0FBTyxPQUFQLEdBQWlCLGdCQUFqQiIsImZpbGUiOiJTeW50aGV0aWNVSUV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFN5bnRoZXRpY1VJRXZlbnRcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3ludGhldGljRXZlbnQgPSByZXF1aXJlKCcuL1N5bnRoZXRpY0V2ZW50Jyk7XG5cbnZhciBnZXRFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZ2V0RXZlbnRUYXJnZXQnKTtcblxuLyoqXG4gKiBAaW50ZXJmYWNlIFVJRXZlbnRcbiAqIEBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzL1xuICovXG52YXIgVUlFdmVudEludGVyZmFjZSA9IHtcbiAgdmlldzogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnZpZXcpIHtcbiAgICAgIHJldHVybiBldmVudC52aWV3O1xuICAgIH1cblxuICAgIHZhciB0YXJnZXQgPSBnZXRFdmVudFRhcmdldChldmVudCk7XG4gICAgaWYgKHRhcmdldCAhPSBudWxsICYmIHRhcmdldC53aW5kb3cgPT09IHRhcmdldCkge1xuICAgICAgLy8gdGFyZ2V0IGlzIGEgd2luZG93IG9iamVjdFxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICB2YXIgZG9jID0gdGFyZ2V0Lm93bmVyRG9jdW1lbnQ7XG4gICAgLy8gVE9ETzogRmlndXJlIG91dCB3aHkgYG93bmVyRG9jdW1lbnRgIGlzIHNvbWV0aW1lcyB1bmRlZmluZWQgaW4gSUU4LlxuICAgIGlmIChkb2MpIHtcbiAgICAgIHJldHVybiBkb2MuZGVmYXVsdFZpZXcgfHwgZG9jLnBhcmVudFdpbmRvdztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gIH0sXG4gIGRldGFpbDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50LmRldGFpbCB8fCAwO1xuICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaXNwYXRjaENvbmZpZyBDb25maWd1cmF0aW9uIHVzZWQgdG8gZGlzcGF0Y2ggdGhpcyBldmVudC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwYXRjaE1hcmtlciBNYXJrZXIgaWRlbnRpZnlpbmcgdGhlIGV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBuYXRpdmVFdmVudCBOYXRpdmUgYnJvd3NlciBldmVudC5cbiAqIEBleHRlbmRzIHtTeW50aGV0aWNFdmVudH1cbiAqL1xuZnVuY3Rpb24gU3ludGhldGljVUlFdmVudChkaXNwYXRjaENvbmZpZywgZGlzcGF0Y2hNYXJrZXIsIG5hdGl2ZUV2ZW50LCBuYXRpdmVFdmVudFRhcmdldCkge1xuICBTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQsIG5hdGl2ZUV2ZW50VGFyZ2V0KTtcbn1cblxuU3ludGhldGljRXZlbnQuYXVnbWVudENsYXNzKFN5bnRoZXRpY1VJRXZlbnQsIFVJRXZlbnRJbnRlcmZhY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bnRoZXRpY1VJRXZlbnQ7Il19