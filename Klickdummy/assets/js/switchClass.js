/*
 *  Author: Tadeas 'donarus' Palusga - www.palusga.cz - tadeas@palusga.cz
 *  Licence: Do whatever you want and let me know if it helps :)
 */

if (typeof  Object.create !== 'function') {
    // function Object.create could be undefined in older browsers
    Object.create = function (obj) {
        function F() {
        };
        F.prototype = obj;
        return new F();
    };
}


(function ($, window, document, undefined) {

    var Switcher = {

        /**
         * Initialize Switcher.
         *
         * @param options user options which will overwrite default options
         * @param elem dom element on which the switcher has been created
         */
        init: function (options, elem) {
            var self = this;
            self.$elem = $(elem);
            self.options = $.extend({}, $.fn.switchClass.options, options);
        },

        /**
         * Removes all classes defined in '*Class' options and adds
         * correct classes defined in 'YYYYYClass' where YYYYY is
         * determined from current document width and restrictions
         * ('*MinSize' options) defined in options.
         */
        switchClass: function () {
            var self = this;

            var extraLargeClass = self.options.extraLargeClass;
            var largeClass = self.options.defaultClass;
            var smallClass = self.options.smallClass;
            var miniClass = self.options.defaultClass;

            self.$elem.removeClass(extraLargeClass);
            self.$elem.removeClass(largeClass);
            self.$elem.removeClass(smallClass);
            self.$elem.removeClass(miniClass);

            var docWidth = $(document).width();
            if (docWidth >= self.options.extraLargeMinSize) {
                self.$elem.addClass(extraLargeClass);
            } else if (docWidth >= self.options.largeMinSize) {
                self.$elem.addClass(largeClass);
            } else if (docWidth >= self.options.smallMinSize) {
                self.$elem.addClass(smallClass);
            } else {
                self.$elem.addClass(miniClass);
            }
        }
    };

    /**
     *
     * @param options user defined options
     */
    $.fn.switchClass = function (options) {
        this.each(function () {
            var switcher = Object.create(Switcher);
            switcher.init(options, this);
            switcher.switchClass();

            $(window).resize(function () {
                switcher.switchClass();
            });
        });
    };

    /**
     * Default options - can be globally rewritten.
     * @type {{extraLargeClass: null, defaultClass: null, smallClass: null, extraLargeMinSize: number, largeMinSize: number, smallMinSize: number}}
     */
    $.fn.switchClass.options = {
        /**
         * If defined, when document is considered as EXTRA LARGE (see extraLargeMinSize option), this class
         * will be used
         */
        extraLargeClass: null,

        /**
         * If defined, when document is considered as LARGE (see extraLargeMinSize option) or document is
         * not considered as LARGE nor EXTRA_LARGE nor SMALL, this class will be used
         */
        defaultClass: null,

        /**
         * If defined, when document is considered as SMALL (see extraLargeMinSize option), this class
         * will be used
         */
        smallClass: null,

        /**
         * when document is wider than this value, document is considered as EXTRA LARGE
         */
        extraLargeMinSize: 1200,

        /**
         * when document is wider than this value, document is considered as LARGE
         */
        largeMinSize: 980,

        /**
         * when document is wider than this value, document is considered as SMALL
         */
        smallMinSize: 740
    };

}(jQuery, window, document));