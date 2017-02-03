import template from './user-auth.html';

export default {
  template,
  bindings: {
    success: '<'
  },
  controller
};

function controller() {
  this.action = 'signin';
}