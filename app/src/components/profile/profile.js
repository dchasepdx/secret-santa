import template from './profile.html';
import styles from './profile.scss';

export default {
  template,
  controller,
};

controller.$inject = ['userService', 'tokenService', '$state'];
function controller(userService, tokenService, $state) {
  this.styles = styles;

  this.$onInit = () => {
    userService.getProfile()
      .then(profile => {
        this.profile = profile;
      });
  };

  this.matches = () => {
    userService.getMatches()
      .then(matchedUsers => {
        this.matchedUsers = matchedUsers;
      })
      .catch(err => {
        this.error = err.data.error;
      });
  };

  this.signout = () => {
    tokenService.remove();
    $state.go('welcome');
  };
}