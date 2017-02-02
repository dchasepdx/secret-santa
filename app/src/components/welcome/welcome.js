import template from './welcome.html';
import styles from './welcome.scss';

export default {
  template,
  controller,
  styles
};

controller.$inject = ['tokenService', '$state'];
function controller(tokenService) {
  this.$onInit = () => {
    if(tokenService.get()) {
      this.hasToken = true;
    }
  };

  this.signout = ($state) => {
    tokenService.remove();
    $state.go('welcome');
  };
}