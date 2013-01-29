// GetVero.com
// -----------
// [Documentation](https://github.com/getvero/vero-api/blob/master/sections/js.md).

analytics.addProvider('Vero', {

    settings : {
        apiKey : null
    },


    // Initialize
    // ----------
    initialize : function (settings) {
        settings = analytics._.resolveSettings(settings, 'apiKey');
        analytics._.extend(this.settings, settings);

        var _veroq = window._veroq = window._veroq || [];
        _veroq.push(['init', { api_key: settings.apiKey }]);

        analytics._.loadScript('//www.getvero.com/assets/m.js');
    },


    // Identify
    // --------

    identify : function (userId, traits) {
        // Don't do anything if we just have traits, because Vero
        // requires a `userId`.
        if (!userId) return;

        traits || (traits = {});

        // Vero takes the `userId` as part of the traits object.
        traits.id = userId;

        // If there wasn't already an email and the userId is one, use it.
        if (!traits.email && analytics._.isEmail(userId)) {
            traits.email = userId;
        }

        // Vero *requires* an email and an id
        if (!traits.id || !traits.email) return;

        window._veroq.push(['user', traits]);
    },


    // Track
    // -----

    track : function (event, properties) {
        window._veroq.push(['track', event, properties]);
    }

});