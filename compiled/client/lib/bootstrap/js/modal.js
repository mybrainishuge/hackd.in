'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.3.6';

  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

    this.$element.trigger(e);

    if (this.isShown || e.isDefaultPrevented()) return;

    this.isShown = true;

    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');

    this.escape();
    this.resize();

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);

      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');

      that.enforceFocus();

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget });

      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();

    e = $.Event('hide.bs.modal');

    this.$element.trigger(e);

    if (!this.isShown || e.isDefaultPrevented()) return;

    this.isShown = false;

    this.escape();
    this.resize();

    $(document).off('focusin.bs.modal');

    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

    this.$dialog.off('mousedown.dismiss.bs.modal');

    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;

      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));

      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');

      if (!callback) return;

      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };
      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  };

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;
    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), (typeof option === 'undefined' ? 'undefined' : _typeof(option)) == 'object' && option);

      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;

  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal;

  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

    if ($this.is('a')) e.preventDefault();

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NsaWVudC9saWIvYm9vdHN0cmFwL2pzL21vZGFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVNBLENBQUMsVUFBVSxDQUFWLEVBQWE7QUFDWjs7Ozs7QUFLQSxNQUFJLFFBQVEsU0FBUixLQUFRLENBQVUsT0FBVixFQUFtQixPQUFuQixFQUE0QjtBQUN0QyxTQUFLLE9BQUwsR0FBMkIsT0FBM0I7QUFDQSxTQUFLLEtBQUwsR0FBMkIsRUFBRSxTQUFTLElBQVgsQ0FBM0I7QUFDQSxTQUFLLFFBQUwsR0FBMkIsRUFBRSxPQUFGLENBQTNCO0FBQ0EsU0FBSyxPQUFMLEdBQTJCLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsZUFBbkIsQ0FBM0I7QUFDQSxTQUFLLFNBQUwsR0FBMkIsSUFBM0I7QUFDQSxTQUFLLE9BQUwsR0FBMkIsSUFBM0I7QUFDQSxTQUFLLGVBQUwsR0FBMkIsSUFBM0I7QUFDQSxTQUFLLGNBQUwsR0FBMkIsQ0FBM0I7QUFDQSxTQUFLLG1CQUFMLEdBQTJCLEtBQTNCOztBQUVBLFFBQUksS0FBSyxPQUFMLENBQWEsTUFBakIsRUFBeUI7QUFDdkIsV0FBSyxRQUFMLENBQ0csSUFESCxDQUNRLGdCQURSLEVBRUcsSUFGSCxDQUVRLEtBQUssT0FBTCxDQUFhLE1BRnJCLEVBRTZCLEVBQUUsS0FBRixDQUFRLFlBQVk7QUFDN0MsYUFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQixpQkFBdEI7QUFDRCxPQUYwQixFQUV4QixJQUZ3QixDQUY3QjtBQUtEO0FBQ0YsR0FsQkQ7O0FBb0JBLFFBQU0sT0FBTixHQUFpQixPQUFqQjs7QUFFQSxRQUFNLG1CQUFOLEdBQTRCLEdBQTVCO0FBQ0EsUUFBTSw0QkFBTixHQUFxQyxHQUFyQzs7QUFFQSxRQUFNLFFBQU4sR0FBaUI7QUFDZixjQUFVLElBREs7QUFFZixjQUFVLElBRks7QUFHZixVQUFNO0FBSFMsR0FBakI7O0FBTUEsUUFBTSxTQUFOLENBQWdC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LElBQVQsQ0FBRCxJQUFtQixJQUE3QixFQUFULEVBQThDLFFBQVEsSUFBUixFQUE5QyxFQUE4RCxNQUFNLElBQU4sRUFBOUQsQ0FBcEQ7O0FBRUEsUUFBSSxNQUFNLEVBQU4sQ0FBUyxHQUFULENBQUosRUFBbUIsRUFBRSxjQUFGOztBQUVuQixZQUFRLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLFVBQVUsU0FBVixFQUFxQjtBQUNoRCxVQUFJLFVBQVUsa0JBQVYsRUFBSixFQUFvQyxPO0FBQ3BDLGNBQVEsR0FBUixDQUFZLGlCQUFaLEVBQStCLFlBQVk7QUFDekMsY0FBTSxFQUFOLENBQVMsVUFBVCxLQUF3QixNQUFNLE9BQU4sQ0FBYyxPQUFkLENBQXhCO0FBQ0QsT0FGRDtBQUdELEtBTEQ7QUFNQSxXQUFPLElBQVAsQ0FBWSxPQUFaLEVBQXFCLE1BQXJCLEVBQTZCLElBQTdCO0FBQ0QsR0FmRDtBQWlCRCxDQXZVQSxDQXVVQyxNQXZVRCxDQUFEIiwiZmlsZSI6Im1vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IG1vZGFsLmpzIHYzLjMuNlxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jbW9kYWxzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTUgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gTU9EQUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIE1vZGFsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgICAgICAgPSBvcHRpb25zXG4gICAgdGhpcy4kYm9keSAgICAgICAgICAgICAgID0gJChkb2N1bWVudC5ib2R5KVxuICAgIHRoaXMuJGVsZW1lbnQgICAgICAgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLiRkaWFsb2cgICAgICAgICAgICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5tb2RhbC1kaWFsb2cnKVxuICAgIHRoaXMuJGJhY2tkcm9wICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLmlzU2hvd24gICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWQgICAgID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggICAgICA9IDBcbiAgICB0aGlzLmlnbm9yZUJhY2tkcm9wQ2xpY2sgPSBmYWxzZVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdGUpIHtcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLmZpbmQoJy5tb2RhbC1jb250ZW50JylcbiAgICAgICAgLmxvYWQodGhpcy5vcHRpb25zLnJlbW90ZSwgJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdsb2FkZWQuYnMubW9kYWwnKVxuICAgICAgICB9LCB0aGlzKSlcbiAgICB9XG4gIH1cblxuICBNb2RhbC5WRVJTSU9OICA9ICczLjMuNidcblxuICBNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMzAwXG4gIE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04gPSAxNTBcblxuICBNb2RhbC5ERUZBVUxUUyA9IHtcbiAgICBiYWNrZHJvcDogdHJ1ZSxcbiAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICBzaG93OiB0cnVlXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KF9yZWxhdGVkVGFyZ2V0KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiAoX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgZSAgICA9ICQuRXZlbnQoJ3Nob3cuYnMubW9kYWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IF9yZWxhdGVkVGFyZ2V0IH0pXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICh0aGlzLmlzU2hvd24gfHwgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB0aGlzLmlzU2hvd24gPSB0cnVlXG5cbiAgICB0aGlzLmNoZWNrU2Nyb2xsYmFyKClcbiAgICB0aGlzLnNldFNjcm9sbGJhcigpXG4gICAgdGhpcy4kYm9keS5hZGRDbGFzcygnbW9kYWwtb3BlbicpXG5cbiAgICB0aGlzLmVzY2FwZSgpXG4gICAgdGhpcy5yZXNpemUoKVxuXG4gICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLCAkLnByb3h5KHRoaXMuaGlkZSwgdGhpcykpXG5cbiAgICB0aGlzLiRkaWFsb2cub24oJ21vdXNlZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC4kZWxlbWVudC5vbmUoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pcyh0aGF0LiRlbGVtZW50KSkgdGhhdC5pZ25vcmVCYWNrZHJvcENsaWNrID0gdHJ1ZVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdHJhbnNpdGlvbiA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoYXQuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICBpZiAoIXRoYXQuJGVsZW1lbnQucGFyZW50KCkubGVuZ3RoKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnQuYXBwZW5kVG8odGhhdC4kYm9keSkgLy8gZG9uJ3QgbW92ZSBtb2RhbHMgZG9tIHBvc2l0aW9uXG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgLnNob3coKVxuICAgICAgICAuc2Nyb2xsVG9wKDApXG5cbiAgICAgIHRoYXQuYWRqdXN0RGlhbG9nKClcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhhdC4kZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcbiAgICAgIH1cblxuICAgICAgdGhhdC4kZWxlbWVudC5hZGRDbGFzcygnaW4nKVxuXG4gICAgICB0aGF0LmVuZm9yY2VGb2N1cygpXG5cbiAgICAgIHZhciBlID0gJC5FdmVudCgnc2hvd24uYnMubW9kYWwnLCB7IHJlbGF0ZWRUYXJnZXQ6IF9yZWxhdGVkVGFyZ2V0IH0pXG5cbiAgICAgIHRyYW5zaXRpb24gP1xuICAgICAgICB0aGF0LiRkaWFsb2cgLy8gd2FpdCBmb3IgbW9kYWwgdG8gc2xpZGUgaW5cbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJykudHJpZ2dlcihlKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGUgPSAkLkV2ZW50KCdoaWRlLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKCF0aGlzLmlzU2hvd24gfHwgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB0aGlzLmlzU2hvd24gPSBmYWxzZVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgICQoZG9jdW1lbnQpLm9mZignZm9jdXNpbi5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgIC5vZmYoJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnKVxuICAgICAgLm9mZignbW91c2V1cC5kaXNtaXNzLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGRpYWxvZy5vZmYoJ21vdXNlZG93bi5kaXNtaXNzLmJzLm1vZGFsJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkodGhpcy5oaWRlTW9kYWwsIHRoaXMpKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgdGhpcy5oaWRlTW9kYWwoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVuZm9yY2VGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KVxuICAgICAgLm9mZignZm9jdXNpbi5icy5tb2RhbCcpIC8vIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgZm9jdXMgbG9vcFxuICAgICAgLm9uKCdmb2N1c2luLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiYgIXRoaXMuJGVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUud2hpY2ggPT0gMjcgJiYgdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93bikge1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5icy5tb2RhbCcsICQucHJveHkodGhpcy5oYW5kbGVVcGRhdGUsIHRoaXMpKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdGhpcy4kZWxlbWVudC5oaWRlKClcbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGJvZHkucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKVxuICAgICAgdGhhdC5yZXNldEFkanVzdG1lbnRzKClcbiAgICAgIHRoYXQucmVzZXRTY3JvbGxiYXIoKVxuICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdoaWRkZW4uYnMubW9kYWwnKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVtb3ZlQmFja2Ryb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYmFja2Ryb3AgJiYgdGhpcy4kYmFja2Ryb3AucmVtb3ZlKClcbiAgICB0aGlzLiRiYWNrZHJvcCA9IG51bGxcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5iYWNrZHJvcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBhbmltYXRlID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID8gJ2ZhZGUnIDogJydcblxuICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICB2YXIgZG9BbmltYXRlID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgYW5pbWF0ZVxuXG4gICAgICB0aGlzLiRiYWNrZHJvcCA9ICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpXG4gICAgICAgIC5hZGRDbGFzcygnbW9kYWwtYmFja2Ryb3AgJyArIGFuaW1hdGUpXG4gICAgICAgIC5hcHBlbmRUbyh0aGlzLiRib2R5KVxuXG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrKSB7XG4gICAgICAgICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCkgcmV0dXJuXG4gICAgICAgIHRoaXMub3B0aW9ucy5iYWNrZHJvcCA9PSAnc3RhdGljJ1xuICAgICAgICAgID8gdGhpcy4kZWxlbWVudFswXS5mb2N1cygpXG4gICAgICAgICAgOiB0aGlzLmhpZGUoKVxuICAgICAgfSwgdGhpcykpXG5cbiAgICAgIGlmIChkb0FuaW1hdGUpIHRoaXMuJGJhY2tkcm9wWzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuXG4gICAgICB0aGlzLiRiYWNrZHJvcC5hZGRDbGFzcygnaW4nKVxuXG4gICAgICBpZiAoIWNhbGxiYWNrKSByZXR1cm5cblxuICAgICAgZG9BbmltYXRlID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFjaylcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFjaygpXG5cbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24gJiYgdGhpcy4kYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuJGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICAgIHZhciBjYWxsYmFja1JlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhhdC5yZW1vdmVCYWNrZHJvcCgpXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICAgIH1cbiAgICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2tSZW1vdmUpXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2tSZW1vdmUoKVxuXG4gICAgfSBlbHNlIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIC8vIHRoZXNlIGZvbGxvd2luZyBtZXRob2RzIGFyZSB1c2VkIHRvIGhhbmRsZSBvdmVyZmxvd2luZyBtb2RhbHNcblxuICBNb2RhbC5wcm90b3R5cGUuaGFuZGxlVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYWRqdXN0RGlhbG9nKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5hZGp1c3REaWFsb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vZGFsSXNPdmVyZmxvd2luZyA9IHRoaXMuJGVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICAhdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiBtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJycsXG4gICAgICBwYWRkaW5nUmlnaHQ6IHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgIW1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRBZGp1c3RtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICBwYWRkaW5nTGVmdDogJycsXG4gICAgICBwYWRkaW5nUmlnaHQ6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5jaGVja1Njcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZnVsbFdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBpZiAoIWZ1bGxXaW5kb3dXaWR0aCkgeyAvLyB3b3JrYXJvdW5kIGZvciBtaXNzaW5nIHdpbmRvdy5pbm5lcldpZHRoIGluIElFOFxuICAgICAgdmFyIGRvY3VtZW50RWxlbWVudFJlY3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIGZ1bGxXaW5kb3dXaWR0aCA9IGRvY3VtZW50RWxlbWVudFJlY3QucmlnaHQgLSBNYXRoLmFicyhkb2N1bWVudEVsZW1lbnRSZWN0LmxlZnQpXG4gICAgfVxuICAgIHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDwgZnVsbFdpbmRvd1dpZHRoXG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMubWVhc3VyZVNjcm9sbGJhcigpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBib2R5UGFkID0gcGFyc2VJbnQoKHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JykgfHwgMCksIDEwKVxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkID0gZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgfHwgJydcbiAgICBpZiAodGhpcy5ib2R5SXNPdmVyZmxvd2luZykgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCBib2R5UGFkICsgdGhpcy5zY3JvbGxiYXJXaWR0aClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIHRoaXMub3JpZ2luYWxCb2R5UGFkKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLm1lYXN1cmVTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7IC8vIHRoeCB3YWxzaFxuICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHNjcm9sbERpdi5jbGFzc05hbWUgPSAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnXG4gICAgdGhpcy4kYm9keS5hcHBlbmQoc2Nyb2xsRGl2KVxuICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aFxuICAgIHRoaXMuJGJvZHlbMF0ucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KVxuICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aFxuICB9XG5cblxuICAvLyBNT0RBTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24sIF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMubW9kYWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgTW9kYWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMubW9kYWwnLCAoZGF0YSA9IG5ldyBNb2RhbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKF9yZWxhdGVkVGFyZ2V0KVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5zaG93KSBkYXRhLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLm1vZGFsXG5cbiAgJC5mbi5tb2RhbCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLm1vZGFsLkNvbnN0cnVjdG9yID0gTW9kYWxcblxuXG4gIC8vIE1PREFMIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5tb2RhbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ubW9kYWwgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBNT0RBTCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5tb2RhbC5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJtb2RhbFwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgdmFyIGhyZWYgICAgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICB2YXIgJHRhcmdldCA9ICQoJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSB8fCAoaHJlZiAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB2YXIgb3B0aW9uICA9ICR0YXJnZXQuZGF0YSgnYnMubW9kYWwnKSA/ICd0b2dnbGUnIDogJC5leHRlbmQoeyByZW1vdGU6ICEvIy8udGVzdChocmVmKSAmJiBocmVmIH0sICR0YXJnZXQuZGF0YSgpLCAkdGhpcy5kYXRhKCkpXG5cbiAgICBpZiAoJHRoaXMuaXMoJ2EnKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAkdGFyZ2V0Lm9uZSgnc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChzaG93RXZlbnQpIHtcbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVybiAvLyBvbmx5IHJlZ2lzdGVyIGZvY3VzIHJlc3RvcmVyIGlmIG1vZGFsIHdpbGwgYWN0dWFsbHkgZ2V0IHNob3duXG4gICAgICAkdGFyZ2V0Lm9uZSgnaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkdGhpcy5pcygnOnZpc2libGUnKSAmJiAkdGhpcy50cmlnZ2VyKCdmb2N1cycpXG4gICAgICB9KVxuICAgIH0pXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9uLCB0aGlzKVxuICB9KVxuXG59KGpRdWVyeSk7XG4iXX0=