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
            Add DriverID
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
              <CModalTitle>Create DriverID</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                label="DriverID"
                placeholder="Enter DriverID"
                v-model="driverId"
                required
              />
              <div class="form-group">
                <label for="name">Name</label>
                <select
                  id="name"
                  class="form-control"
                  v-model="username"
                  required
                >
                  <option
                    v-for="user in users"
                    :key="user._id"
                    :value="user.username"
                  >
                    {{ user.username }}
                  </option>
                </select>
              </div>
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
                @click.="addDriver()"
              >
                Save
              </CButton>
            </CModalFooter>
          </CModal>
          <CModal
            alignment="center"
            :visible="showModal1"
            @close="
              () => {
                this.username = ''
                this.driverId = ''
                this.driver_id = ''
                this.user_id = ''
                showModal1 = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Edit DriverID</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                label="DriverID"
                placeholder="Enter DriverID"
                v-model="driverId"
                required
              />
              <div class="form-group">
                <label for="name">Name</label>
                <select
                  id="name"
                  class="form-control"
                  v-model="username"
                  required
                >
                  <option
                    v-for="user in users"
                    :key="user._id"
                    :value="user.username"
                  >
                    {{ user.username }}
                  </option>
                </select>
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                @click="
                  () => {
                    this.username = ''
                    this.driverId = ''
                    this.driver_id = ''
                    this.user_id = ''
                    showModal1 = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                style="background-color: #003b5c; color: white"
                @click.="editDriver()"
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
              <CTableHeaderCell class="text-center">
                Driver ID
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Name</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Created ON
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="(driver, index) in drivers" :key="index">
              <CTableDataCell class="text-center">
                {{ driver.driverId }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ driver.user.username }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ driver.createdAt }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <CButton
                    style="background-color: #003b5c; color: white"
                    @click="
                      () => {
                        driver_id = driver._id
                        driverId = driver.driverId
                        username = driver.user.username
                        showModal1 = true
                      }
                    "
                  >
                    Edit
                  </CButton>
                  <CButton
                    style="background-color: #c8102e; color: white"
                    @click="deleteDriver(driver._id)"
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
import UserService from '../services/user.service'

export default {
  name: 'DriverId',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      drivers: '',
      showModal: false,
      showModal1: false,
      driver_id: '',
      driverId: '',
      user_id: '',
      username: '',
      create_At: '',
      users: '',
    }
  },
  methods: {
    addDriver() {
      this.users.map((user) => {
        if (user.username == this.username) this.user_id = user._id
      })
      const driver = {
        driverId: this.driverId,
        user: this.user_id,
      }
      UserService.postDriver(driver).then(
        (response) => {
          response
          UserService.getDriver().then(
            (response) => {
              const drivers = response.data
              let s = drivers.map((driver) => {
                let date = new Date(driver.createdAt)
                driver.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return driver
              })
              this.drivers = s
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

      // Reset the form fields and hide the modal
      ;(this.driver_id = ''), (this.driverId = '')
      this.user_id = ''
      this.username = ''
      this.create_At = ''
      this.showModal = false
      this.showModal1 = false
    },
    editDriver() {
      this.users.map((user) => {
        if (user.username == this.username) this.user_id = user._id
      })
      const driver = {
        _id: this.driver_id,
        driverId: this.driverId,
        user: this.user_id,
      }
      UserService.postDriver(driver).then(
        (response) => {
          response
          UserService.getDriver().then(
            (response) => {
              const drivers = response.data
              let s = drivers.map((driver) => {
                let date = new Date(driver.createdAt)
                driver.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return driver
              })
              this.drivers = s
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

      // Reset the form fields and hide the modal
      this.driver_id = ''
      this.driverId = ''
      this.user_id = ''
      this.username = ''
      this.create_At = ''
      this.showModal = false
      this.showModal1 = false
    },
    deleteDriver(driver_id) {
      if (!window.confirm('Are you sure you want to delete this item?')) return
      UserService.delDriver(driver_id).then((response) => {
        response
        UserService.getDriver().then(
          (response) => {
            const drivers = response.data
            let s = drivers.map((driver) => {
              let date = new Date(driver.createdAt)
              driver.createdAt = date.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              return driver
            })
            this.drivers = s
          },
          (error) => {
            ;(error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          },
        )
      })
    },
  },
  mounted() {
    UserService.getDriver().then(
      (response) => {
        const drivers = response.data
        let s = drivers.map((driver) => {
          let date = new Date(driver.createdAt)
          driver.createdAt = date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          return driver
        })
        this.drivers = s
      },
      (error) => {
        ;(error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      },
    )
    UserService.getUser().then(
      (response) => {
        this.users = response.data
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
