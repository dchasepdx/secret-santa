userService.$inject = ['$http', 'apiUrl', 'tokenService'];

export default function userService($http, apiUrl, tokenService) {
  return {
    signup(newUser) {
      return $http.post(`${apiUrl}/auth/signup`, newUser)
        .then(res => {
          tokenService.set(res.data.token);
        });
    },
    signin(user) {
      return $http.post(`${apiUrl}/auth/signin`, user)
        .then(res => {
          tokenService.set(res.data.token);
          return res.data;
        });
    },
    signout() {
      tokenService.remove();
    },
    getProfile() {
      return $http.get(`${apiUrl}/users`)
        .then(res => {
          return res.data;
        });
    },
    getMatches() {
      return $http.get(`${apiUrl}/users/match`)
        .then(res => {
          return res.data;
        });
    }
  };
}