var bernoulli = bernoulli || {};

(function(ns) {
    var baseUrl = 'https://bernoulli.herokuapp.com/client/api/experiments/?';

    var makeJsonpRequeset = function(options) {
        var strs = [];
        for (var key in options) {
            strs.push(key + '=' + encodeURIComponent(options[key]));
        }

        var tag = document.createElement('script');
        tag.src = baseUrl + strs.join('&');
        document.getElementsByTagName('head')[0].appendChild(tag);
    };

    ns.callback = function(response) {
        if (response.status == 'ok') {
            ns._successCallback(response.value);
        } else if (ns._failureCallback) {
            ns._failureCallback(response.message);
        }
    };

    ns.getExperiments = function(options, success, error) {
        if (options.experimentIds != null && ns.isArray(options.experimentIds)) {
            options.experimentIds = options.experimentIds.join(',');
        }

        ns._successCallback = success;
        ns._failureCallback = error;
        options.callback = 'bernoulli.callback';
        makeJsonpRequeset(options);
    };

    ns.goalAttained = function(options, success, error) {
        options = {
            goalAttained: true,
            clientId: options.clientId,
            userId: options.userId,
            experimentId: options.experimentId,
            callback: 'bernoulli.callback'
        };

        ns._successCallback = success;
        ns._failureCallback = error;
        makeJsonpRequeset(options);
    };

    ns.isArray = function(vArg) {
        var isArray;
        isArray = vArg instanceof Array;
        return isArray;
    };
})(bernoulli);
