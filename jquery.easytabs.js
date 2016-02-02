/*globals jQuery, window, document */
(function ($) {
    "use strict";
    var pluginName  =   "easyTabs",
        defaults    =   {
            nav: '.tabs-nav',
            content: '.tabs-content',
            navActive: 'active',
            tabActive: 'tab-active',
            eventName: 'click',
            eventNameSuffix: 'easyTabs',
            afterChange: function () {}
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element        =   element;
        this.$element       =   $(this.element);
        this.settings       =   $.extend({}, defaults, options);
        this.$nav           =   this.$element.find(this.settings.nav);
        this.$content       =   this.$element.find(this.settings.content);
        this.init();
    }
    Plugin.prototype = {
        init: function () {
            var that = this;
            that.$nav.find('li a').on(that.getEventName(), function (e) {
                e.preventDefault();
                var $this = $(this);
                that.$nav.find('.' + that.settings.navActive).removeClass(that.settings.navActive);
                $this.parents('li').addClass(that.settings.navActive);
                that.$content.find('> .' + that.settings.tabActive).removeClass(that.settings.tabActive);
                that.$content.find($this.attr('href')).addClass(that.settings.tabActive);
                that.settings.afterChange();
            });
            if (that.getEventName('typeOnly') === 'mouseover') {
                this.enableMouseOverEvents();
            }
        },
        enableMouseOverEvents: function () {
            var that = this;
            this.$element.on('mouseleave.' + this.settings.eventNameSuffix, function () {
                that.$nav.find('.' + that.settings.navActive).removeClass(that.settings.navActive);
                that.$content.find('> .' + that.settings.tabActive).removeClass(that.settings.tabActive);
            });
        },
        disableMouseOverEvents: function () {
            this.$element.off('mouseleave.' + this.settings.eventNameSuffix);
        },
        destroy: function () {
            this.$nav.find('li a').off(this.getEventName());
            if (this.getEventName('typeOnly') === 'mouseover') {
                this.disableMouseOverEvents();
            }
        },
        reinit: function (settings) {
            this.destroy();
            this.settings = $.extend({}, defaults, settings);
            this.$nav = this.$element.find(this.settings.nav);
            this.$content = this.$element.find(this.settings.content);
            this.init();
        },
        getEventName: function (typeOnly) {
            return typeOnly ? this.settings.eventName : this.settings.eventName + '.' + this.settings.eventNameSuffix;
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));