import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from '@/config'

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'auth/login', {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    return axios.post(API_URL + 'auth/register', {
      username: user.username,
      password: user.password,
    })
  }
  editProfile(user) {
    const id = JSON.parse(localStorage.getItem('user')).id
    return axios.put(
      API_URL + 'auth',
      {
        id,
        username: user.username,
        oldpassword: user.oldPassword,
        newpassword: user.newPassword,
      },
      { headers: authHeader() },
    )
  }
}

export default new AuthService()
