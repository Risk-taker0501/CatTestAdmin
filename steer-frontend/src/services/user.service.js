import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from '@/config'

class UserService {
  getPublicContent(page, from, to, search) {
    return axios.get(
      API_URL + 'inspection/' + page + '/' + from + '/' + to + '/' + search,
      { headers: authHeader() },
    )
  }

  getUser() {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  postUser(user) {
    return axios.post(API_URL + 'user', user, { headers: authHeader() })
  }

  putUser() {
    return axios.put(API_URL + 'user', { headers: authHeader() })
  }
  getScenario() {
    return axios.get(API_URL + 'scenario', { headers: authHeader() })
  }
  delUser(user_id) {
    return axios.delete(API_URL + 'user/' + user_id, { headers: authHeader() })
  }
  postScenario(scenario) {
    return axios.post(API_URL + 'scenario', scenario, { headers: authHeader() })
  }
  delScenario(scenario_id) {
    return axios.delete(API_URL + 'scenario/' + scenario_id, {
      headers: authHeader(),
    })
  }
  postDriver(driver) {
    return axios.post(API_URL + 'driverId', driver, { headers: authHeader() })
  }
  getDriver() {
    return axios.get(API_URL + 'driverId', { headers: authHeader() })
  }
  delDriver(driver_id) {
    return axios.delete(API_URL + 'driverId/' + driver_id, {
      headers: authHeader(),
    })
  }
  postLicense(license) {
    return axios.post(API_URL + 'licensePlate', license, {
      headers: authHeader(),
    })
  }
  getLicense() {
    return axios.get(API_URL + 'licensePlate', { headers: authHeader() })
  }
  delLicense(license_id) {
    return axios.delete(API_URL + 'licensePlate/' + license_id, {
      headers: authHeader(),
    })
  }
}

export default new UserService()
