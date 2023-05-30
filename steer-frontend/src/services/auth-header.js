export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.token) {
    //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-auth-token': user.token } // for Node.js Express back-end
  } else {
    return {}
  }
}
