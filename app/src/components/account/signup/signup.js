import template from './signup.html';

export default {
  template,
  controller,
  bindings: {
    success: '<'
  }
};

controller.$inject = ['userService'];

function controller(userService) {

  this.reset = () => {
    this.email = '';
    this.name = '';
    this.password = '';
  };

  this.signup = () => {
    return userService.signup({
      email: this.email,
      name: this.name,
      password: this.password
    })
    .then(() => {
      this.success();
      this.reset();
    })
    .catch(err => this.error = err.error);
  };
}
