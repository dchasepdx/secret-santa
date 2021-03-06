tokenService.$inject = ['$window'];

const TOKEN = 'santa_token';

export default function tokenService($window) {
  return {
    get() {
      return $window.localStorage.getItem(TOKEN);
    },
    set(token) {
      $window.localStorage.setItem(TOKEN, token);
    },
    remove() {
      $window.localStorage.removeItem(TOKEN);
    }
  };
}