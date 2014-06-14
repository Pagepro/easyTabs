/*globals jQuery, window, document */
(function ($) {
    "use strict";
    var pluginName  =   "easyTabs",
        defaults    =   {
            nav: '.tabs-nav',
            content: '.tabs-content',
            navActive: 'active',
            tabActive: 'tab-active',
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
            that.$nav.find('li a').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                that.$nav.find('.' + that.settings.navActive).removeClass(that.settings.navActive);
                $this.parent().addClass(that.settings.navActive);
                
                that.$content.find('> .' + that.settings.tabActive).removeClass(that.settings.tabActive);
                that.$content.find($this.attr('href')).addClass(that.settings.tabActive);
                that.settings.afterChange();
            });
            that.$nav.find('li:first-child a').trigger('click');
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));