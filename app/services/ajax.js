import computed from 'ember-computed';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import service from 'ember-service/inject';
import AjaxService from 'ember-ajax/services/ajax';
import config from 'client/config/environment';

export default AjaxService.extend({
  contentType: 'application/vnd.api+json',
  namespace: '/api/edge',
  session: service(),

  init() {
    this._super(...arguments);
    set(this, 'host', config.kitsu.APIHost);
  },

  headers: computed('session.isAuthenticated', function() {
    const headers = {
      accept: 'application/vnd.api+json'
    };
    const isAuthenticated = get(this, 'session.isAuthenticated');
    if (isAuthenticated) {
      get(this, 'session').authorize('authorizer:application', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
    }
    return headers;
  }).readOnly()
});
