import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('secret');
  this.route('callback');
  this.route('four-oh-four', { path: '*:' });
  this.route('unauthorized');
});

export default Router;
