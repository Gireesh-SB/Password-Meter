(function ($, undefined) {
    $.widget('ux.PasswordMeter', {
        vars: {
            passwordBoxId: '',
            strength: 0,
            symbols: ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '|', '\\', '[', '{', ']', '}', ':', ';', '\'', '"', ',', '<', '.', '>', '/', '?'],
            alphaCount: 0,
            numberCount: 0,
            symbolCount: 0,
            length: 0
        },
        options: {
            color0: '#e2e2e2',
            color25: '#ff6a00',
            color50: '#f7d722',
            color75: '#b6ff00',
            color100: '#6bc246'
        },
        _create: function () {
            this.vars.passwordBoxId = $(this.element).attr('id');
            this._setKeyPressEvent();
        },
        _init: function () {
        },
        _destroy: function () {
        },
        _setKeyPressEvent: function () {
            var that = this;
            var id = that.vars.passwordBoxId;
            $('#' + id + ' input[type=password]').on('keydown', function () {
                that.vars.passwordBoxId = id;
                var password = $(this).val();
                that._validatePassword(password);
            });
        },
        _validatePassword: function (password) {
            var that = this;
            that._clearVars();
            that.vars.length = password.length;
            if (that.vars.length >= 8) {
                that.vars.strength += 25;
            }
            var regExpAlpha = /[A-Za-z]/;
            var regExpNum = /[0-9]/;
            var isValid = false;
            for (var i = 0; i < password.length; i++) {
                var current = password.charAt(i);
                isValid = regExpAlpha.test(current);
                if (isValid) {
                    that.vars.alphaCount++;
                }
                isValid = regExpNum.test(current);
                if (isValid) {
                    that.vars.numberCount++;
                }
                if ($.inArray(current, that.vars.symbols) != -1) {
                    that.vars.symbolCount++;
                }
            }
            if (that.vars.alphaCount >= 4) {
                that.vars.strength += 25;
            }
            if (that.vars.numberCount >= 2) {
                that.vars.strength += 25;
            }
            if (that.vars.symbolCount >= 2) {
                that.vars.strength += 25;
            }
            that._setClasses();
        },
        _setClasses: function () {
            var that = this;
            var color = '#e2e2e2';
            switch (that.vars.strength) {
                default:
                    color = that.options.color0;
                case 25:
                    color = that.options.color25;
                    break;
                case 50:
                    color = that.options.color50;
                    break;
                case 75:
                    color = that.options.color75;
                    break;
                case 100:
                    color = that.options.color100;
                    break;
            }
            var id = $('#' + that.vars.passwordBoxId).attr('id');
            $('#' + id + ' .password-strength').css({
                width: that.vars.strength + '%',
                backgroundColor: color
            });
        },
        _clearVars: function () {
            var that = this;
            that.vars.strength = 0;
            that.vars.alphaCount = 0;
            that.vars.numberCount = 0;
            that.vars.symbolCount = 0;
            that.vars.length = 0;
        }
    });
})(jQuery);
