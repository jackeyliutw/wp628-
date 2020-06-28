! function($) {
    "use strict";
    var XoloAdmin = {
        init: function() {
            $(document).ready(XoloAdmin.ready), $(window).on("load", XoloAdmin.load), XoloAdmin.bindUIActions(), $(document).trigger("xoloReady")
        },
        ready: function() {},
        load: function() {
            window.dispatchEvent(new Event("resize"))
        },
        resize: function() {},
        bindUIActions: function() {
            var $this, $wrap = $("#wpwrap");
            $("body");
            $wrap.on("click", ".plugins .xolo-btn:not(.active)", (function(e) {
                e.preventDefault(), $wrap.find(".plugins .xolo-btn.in-progress").length || ($this = $(this), XoloAdmin.pluginAction($this))
            })), $(document).on("wp-plugin-install-success", XoloAdmin.pluginInstallSuccess), $(document).on("wp-plugin-install-error", XoloAdmin.pluginInstallError)
        },
        pluginAction: function($button) {
            if ($button.addClass("in-progress").attr("disabled", "disabled").html(xolo_strings.texts[$button.data("action") + "-inprogress"]), "install" === $button.data("action")) wp.updates.shouldRequestFilesystemCredentials && !wp.updates.ajaxLocked && (wp.updates.requestFilesystemCredentials(event), $(document).on("credential-modal-cancel", (function() {
                $button.removeAttr("disabled").removeClass("in-progress").html(xolo_strings.texts.install), wp.a11y.speak(wp.updates.l10n.updateCancel, "polite")
            }))), wp.updates.installPlugin({
                slug: $button.data("plugin")
            });
            else {
                var data = {
                    _ajax_nonce: xolo_strings.wpnonce,
                    plugin: $button.data("plugin"),
                    action: "xolo-plugin-" + $button.data("action")
                };
                $.post(xolo_strings.ajaxurl, data, (function(response) {
                    response.success ? $button.data("redirect") ? window.location.href = $button.data("redirect") : location.reload() : $(".plugins .xolo-btn.in-progress").removeAttr("disabled").removeClass("in-progress primary").addClass("secondary").html(xolo_strings.texts.retry)
                }))
            }
        },
        pluginInstallSuccess: function(event, response) {
            event.preventDefault();
            var activatedSlug, $init = jQuery(event.target).data("init");
            activatedSlug = void 0 === $init ? response.slug : $init;
            var $button = $('.plugins a[data-plugin="' + activatedSlug + '"]');
            $button.data("action", "activate"), XoloAdmin.pluginAction($button)
        },
        pluginInstallError: function(event, response) {
            event.preventDefault();
            var activatedSlug, $init = jQuery(event.target).data("init");
            activatedSlug = void 0 === $init ? response.slug : $init, $('.plugins a[data-plugin="' + activatedSlug + '"]').attr("disabled", "disabled").removeClass("in-progress primary").addClass("secondary").html(wp.updates.l10n.installFailedShort)
        }
    };
    XoloAdmin.init(), window.xoloadmin = XoloAdmin
}(jQuery);