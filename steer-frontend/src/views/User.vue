<template>
  <div>
    <CRow>
      <CCol :md="12">
        <div class="col-md-2 d-flex">
          <CButton
            class="container-fluid"
            style="background-color: #003b5c; color: white"
            variant="outline"
            @click="showModal = true"
          >
            Add User
          </CButton>
          <CModal
            alignment="center"
            :visible="showModal"
            @close="
              () => {
                showModal = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Create User</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="Username"
                label="Username"
                placeholder="Enter Username"
                v-model="username"
                required
              /><CFormInput
                type="password"
                label="Password"
                placeholder="Enter Password"
                v-model="password"
                required
              />
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                @click="
                  () => {
                    showModal = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                style="background-color: #003b5c; color: white"
                @click.="addUser()"
              >
                Save
              </CButton>
            </CModalFooter>
          </CModal>
        </div>
        <CTable
          align="middle"
          class="mb-0 mt-3 border"
          bordered
          border-color="dark"
          hover
          responsive
        >
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell class="text-center">ID</CTableHeaderCell>
              <CTableHeaderCell class="text-center">Username</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Created ON
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="(user, index) in users" :key="index">
              <CTableDataCell class="text-center">
                {{ index + 1 }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ user.username }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ user.createdAt }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <CButton
                    style="background-color: #c8102e; color: white"
                    @click="deleteUser(user._id)"
                    >Delete</CButton
                  >
                </div>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import UserService from '@/services/user.service'

export default {
  name: 'User',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      users: '',
      showModal: false,
      username: '',
      password: '',
      create_At: '',
    }
  },
  methods: {
    addUser() {
      const user = {
        username: this.username,
        password: this.password,
      }
      UserService.postUser(user).then(
        (response) => {
          response
          UserService.getUser().then(
            (response) => {
              const users = response.data
              let s = users.map((user) => {
                let date = new Date(user.createdAt)
                user.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return user
              })
              this.users = s
            },
            (error) => {
              ;(error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            },
          )
          //this.users.push(user);
        },
        (error) => {
          ;(error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        },
      )

      // Reset the form fields and hide the modal
      this.username = ''
      this.password = ''
      this.createdAt = ''
      this.showModal = false
    },
    deleteUser(user_id) {
      if (!window.confirm('Are you sure you want to delete this item?')) return
      UserService.delUser(user_id).then(
        (response) => {
          response
          UserService.getUser().then(
            (response) => {
              const users = response.data
              let s = users.map((user) => {
                let date = new Date(user.createdAt)
                user.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return user
              })
              this.users = s
            },
            (error) => {
              ;(error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            },
          )
        },
        (error) => {
          ;(error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        },
      )
    },
  },
  mounted() {
    UserService.getUser().then(
      (response) => {
        const users = response.data
        let s = users.map((user) => {
          let date = new Date(user.createdAt)
          user.createdAt = date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          return user
        })
        this.users = s
      },
      (error) => {
        ;(error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      },
    )
  },
}
</script>
