<template>
  <div>
    <CRow>
      <CCol :md="12">
        <div class="col-md-5">
          <form @submit.prevent="submitForm">
            <CFormInput
              type="Username"
              label="Username"
              placeholder="Enter Username"
              v-model="username"
              required
            />
            <CFormInput
              type="password"
              label="Old Password"
              placeholder="Enter OldPassword"
              v-model="oldPassword"
              :invalid="!passincorrect"
              :feedback-invalid="error"
              required
            />
            <CFormInput
              type="password"
              label="New Password"
              placeholder="Enter New Password"
              v-model="newPassword"
              required
            />
            <CFormInput
              type="password"
              label="Confirm Password"
              placeholder="Enter Confirm Password"
              v-model="confirmPassword"
              :feedback-invalid="feedback"
              :invalid="!validateConfirmPassword"
            />
            <CButton
              class="container-fluid mt-3"
              style="background-color: #003b5c; color: white"
              variant="outline"
              type="submit"
            >
              Update
            </CButton>
          </form>
        </div>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import AuthService from '@/services/auth.service'

export default {
  name: 'Admin',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      passincorrect: true,
      feedback: '',
      error: '',
      validateConfirmPassword: true,
    }
  },
  methods: {
    submitForm() {
      if (this.newPassword !== this.confirmPassword) {
        this.passincorrect = true
        this.error = ''
        this.validateConfirmPassword = false
        this.feedback = 'Password is not match.'
        return
      }
      this.feedback = ''
      this.validateConfirmPassword = true
      AuthService.editProfile({
        username: this.username,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      }).then(
        () => {
          this.$store.dispatch('auth/logout')
          this.$router.push('/login')
        },
        (error) => {
          this.error = error.response.data.passwordincorrect
          console.log(this.error)
          this.passincorrect = false
        },
      )
    },
  },
  mounted() {
    this.username = JSON.parse(localStorage.getItem('user')).username
  },
}
</script>
