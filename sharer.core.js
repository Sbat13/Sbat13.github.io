(function (window, document) {
  'use strict';

  var Sharer = function (elem) {
    this.elem = elem;
  };

  Sharer.services = {};

  Sharer.register = function (name, config) {
    Sharer.services[name.toLowerCase()] = config;
  };

  Sharer.init = function () {
    var elems = document.querySelectorAll('[data-sharer]');
    elems.forEach(function (el) {
      el.addEventListener('click', Sharer.add);
    });
  };

  Sharer.add = function (ev) {
    var target = ev.currentTarget || ev.srcElement;
    var sharer = new Sharer(target);
    sharer.share();
    console.log("Sharer clicked:", target);
    console.log("Share URL:", shareUrl);
  };

  Sharer.prototype = {
    constructor: Sharer,

    // Defaults: url = current page, title = page title, subject = page title
    getValue: function (attr) {
      var val = this.elem.getAttribute('data-' + attr);
      if (val !== null) return val;

      switch (attr) {
        case 'url':
          return window.location.href;
        case 'title':
          return document.title;
        case 'subject':
          return document.title;
        case 'body':
          return document.title + '\n' + window.location.href;
        case 'text':
          return document.title + ' ' + window.location.href;
        default:
          return '';
      }
    },

    share: function () {
      var serviceName = this.getValue('sharer').toLowerCase();
      var service = Sharer.services[serviceName];
      if (!service) {
        console.warn('Sharer: service "' + serviceName + '" not found.');
        return false;
      }

      var params = {};
      for (var key in service.params) {
        var attr = service.params[key];
        params[key] = this.getValue(attr);
      }

      var shareUrl = service.shareUrl;
      var query = Object.keys(params)
        .filter(k => params[k])
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');

      if (query) {
        shareUrl += (shareUrl.includes('?') ? '&' : '?') + query;
      }

      this.openWindow(shareUrl, service.width, service.height);
    },

    openWindow: function (url, width, height) {
      var isLink = this.getValue('link') === 'true';
      var isBlank = this.getValue('blank') === 'true';

      if (isLink) {
        if (isBlank) {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      } else {
        var popWidth = width || 600;
        var popHeight = height || 480;
        var left = window.innerWidth / 2 - popWidth / 2 + window.screenX;
        var top = window.innerHeight / 2 - popHeight / 2 + window.screenY;
        var opts = `scrollbars=no,width=${popWidth},height=${popHeight},top=${top},left=${left}`;
        var newWindow = window.open(url, '', opts);
        if (newWindow && window.focus) {
          newWindow.focus();
        }
      }
    },
  };

  if (document.readyState === 'complete' || document.readyState !== 'loading') {
    Sharer.init();
  } else {
    document.addEventListener('DOMContentLoaded', Sharer.init);
  }

  window.Sharer = Sharer;
})(window, document);



