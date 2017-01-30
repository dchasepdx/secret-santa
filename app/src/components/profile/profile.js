import template from './profile.html';

export default {
  template,
  controller
};

controller.$inject = ['userService'];
function controller(userService) {
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
      });
  };
}