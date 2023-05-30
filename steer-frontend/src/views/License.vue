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
            Add License Plate
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
              <CModalTitle>Create License Plate</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                label="License Plate"
                placeholder="Enter License Plate"
                v-model="licensePlate"
                required
              /><CFormInput
                type="text"
                label="Vehicle Model"
                placeholder="Enter Vehicle Model"
                v-model="vehicalModel"
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
                @click.="addLicense()"
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
                this.licensePlate = ''
                this.vehicalModel = ''
                this.license_id = ''
                showModal1 = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Edit License Plate</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                label="License Plate"
                placeholder="Enter License Plate"
                v-model="licensePlate"
                required
              /><CFormInput
                type="text"
                label="Vehicle Model"
                placeholder="Enter Vehicle Model"
                v-model="vehicalModel"
                required
              />
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                @click="
                  () => {
                    this.licensePlate = ''
                    this.vehicalModel = ''
                    this.license_id = ''
                    showModal1 = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                style="background-color: #003b5c; color: white"
                @click.="editLicense()"
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
                License Plate
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Vehicle Model
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Created ON
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="(license, index) in licenses" :key="index">
              <CTableDataCell class="text-center">
                {{ license.licensePlate }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ license.vehicalModel }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ license.createdAt }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <CButton
                    style="background-color: #003b5c; color: white"
                    @click="
                      () => {
                        license_id = license._id
                        licensePlate = license.licensePlate
                        vehicalModel = license.vehicalModel
                        showModal1 = true
                      }
                    "
                  >
                    Edit
                  </CButton>
                  <CButton
                    style="background-color: #c8102e; color: white"
                    @click="deleteLicense(license._id)"
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
  name: 'License',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      licenses: '',
      showModal: false,
      showModal1: false,
      license_id: '',
      licensePlate: '',
      vehicalModel: '',
      create_At: '',
    }
  },
  methods: {
    addLicense() {
      const license = {
        licensePlate: this.licensePlate,
        vehicalModel: this.vehicalModel,
      }
      UserService.postLicense(license).then(
        (response) => {
          response
          UserService.getLicense().then(
            (response) => {
              const licenses = response.data
              let s = licenses.map((license) => {
                let date = new Date(license.createdAt)
                license.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return license
              })
              this.licenses = s
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
      ;(this.licensePlate = ''), (this.vehicalModel = ''), (this.create_At = '')
      this.showModal = false
      this.showModal1 = false
    },
    editLicense() {
      const license = {
        _id: this.license_id,
        licensePlate: this.licensePlate,
        vehicalModel: this.vehicalModel,
      }
      UserService.postLicense(license).then(
        (response) => {
          response
          UserService.getLicense().then(
            (response) => {
              const licenses = response.data
              let s = licenses.map((license) => {
                let date = new Date(license.createdAt)
                license.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return license
              })
              this.licenses = s
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
      ;(this.licensePlate = ''), (this.vehicalModel = ''), (this.create_At = '')
      this.showModal = false
      this.showModal1 = false
    },
    deleteLicense(license_id) {
      if (!window.confirm('Are you sure you want to delete this item?')) return
      UserService.delLicense(license_id).then((response) => {
        response
        UserService.getLicense().then(
          (response) => {
            const licenses = response.data
            let s = licenses.map((license) => {
              let date = new Date(license.createdAt)
              license.createdAt = date.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              return license
            })
            this.licenses = s
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
    UserService.getLicense().then(
      (response) => {
        const licenses = response.data
        let s = licenses.map((license) => {
          let date = new Date(license.createdAt)
          license.createdAt = date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          return license
        })
        this.licenses = s
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
