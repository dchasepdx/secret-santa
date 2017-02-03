import template from './welcome.html';
import styles from './welcome.scss';

export default {
  template,
  controller,
};

controller.$inject = ['tokenService', '$state'];
function controller(tokenService, $state) {
  this.styles = styles;
  this.hasToken = false;

  this.$onInit = () => {
    if(tokenService.get()) {
      this.hasToken = true;
    }
  };

  this.signout = () => {
    tokenService.remove();
    $state.go('welcome');
    this.hasToken = false;
  };
}