<template>
  <div>
    <CRow>
      <CCol :md="12">
        <div class="row mb-3">
          <div class="col-md-3">
            <div>
              <label>From</label>
              <input
                placeholder="Select date"
                type="date"
                class="form-control"
                v-model="fromDate"
              />
            </div>
          </div>
          <div class="col-md-3">
            <label>To</label>
            <input
              placeholder="Select date"
              type="date"
              class="form-control"
              v-model="toDate"
            />
          </div>
          <div class="col-md-4">
            <label>Search</label>
            <CFormInput
              type="text"
              placeholder="Search..."
              v-model="searchTerm"
            />
          </div>
          <div class="col-md-2 d-flex mt-3">
            <CButton
              class="container-fluid"
              color="success"
              variant="outline"
              @click="search()"
            >
              Search
            </CButton>
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <CPagination aria-label="Page navigation example">
            <CPaginationItem
              @click="pageclick(currentPage - 1)"
              :disable="disable1"
              ><span aria-hidden="true">&laquo;</span></CPaginationItem
            >
            <CPaginationItem>{{ currentPage }}</CPaginationItem>
            <CPaginationItem
              @click="pageclick(currentPage + 1)"
              :disable="disable2"
              ><span aria-hidden="true">&raquo;</span></CPaginationItem
            >
          </CPagination>
          <CButton class="mb-3" color="success" @click="downloadCsv()">
            DownLoad CSV
          </CButton>
        </div>
        <CTable
          align="middle"
          class="mb-0 border"
          bordered
          border-color="dark"
          hover
          responsive
        >
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell class="text-center">
                ScenarioID
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">RUN</CTableHeaderCell>
              <CTableHeaderCell class="text-center">Status</CTableHeaderCell>
              <CTableHeaderCell class="text-center">Driver ID</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                License Plate
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Start Time
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                End Time
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Total</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Parking Structure
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Weather</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Road Condition
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Illumination
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Traffic</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Disengagement Type
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Disengagement Reason
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Notes</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="(inspection, index) in inspections" :key="index">
              <CTableDataCell class="text-center">
                {{ inspection.scenarioID }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.run }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.status ? 'PASS' : 'FAIL' }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.driverID }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.licensePlate }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.startTime }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.endTime }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.scenarioId }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.parkingStructure }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.weather }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.roadCondition }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.illumination }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.trafficCondition }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.disengagementType }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.disengagementReason }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ inspection.notes }}
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
import Papa from 'papaparse'

// import "../../node_modules/vue-simple-calendar/dist/style.css"
// // The next two lines are optional themes
// import "../../node_modules/vue-simple-calendar/dist/css/default.css"
// import "../../node_modules/vue-simple-calendar/dist/css/holidays-us.css"

export default {
  name: 'Home',
  data() {
    return {
      inspections: '',
      searchTerm: '',
      fromDate: '2000-01-01',
      toDate: null,
      disable1: false,
      disable2: false,
      currentPage: 0,
      countPage: 0,
    }
  },
  methods: {
    downloadCsv() {
      const csv = Papa.unparse(this.inspections)
      const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const d = new Date()
      const fileName = 'Inspections (' + d.toDateString() + ')'

      // Check if the browser is Internet Explorer
      if (window.navigator.msSaveBlob) {
        // Internet Explorer-specific code
        window.navigator.msSaveBlob(csvData, fileName)
      } else {
        // Create a link element, set its attributes, and click it programmatically
        const downloadLink = document.createElement('a')
        const url = URL.createObjectURL(csvData)
        downloadLink.href = url
        downloadLink.download = fileName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        URL.revokeObjectURL(url)
      }
    },
    search() {
      UserService.getPublicContent(
        1,
        this.fromDate,
        this.toDate,
        this.searchTerm ? this.searchTerm : 'all',
      ).then(
        (response) => {
          this.inspections = response.data
        },
        (error) => {
          ;(error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        },
      )
      this.currentPage = 1
    },
    pageclick(page) {
      UserService.getPublicContent(
        page,
        this.fromDate,
        this.toDate,
        this.searchTerm ? this.searchTerm : 'all',
      ).then(
        (response) => {
          if (response.data[0] == null) {
            this.currentPage = page - 1
            return
          } else {
            this.inspections = response.data
            this.currentPage = page
          }
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
    const d = new Date()
    d.setDate(d.getDate() + 1)
    this.toDate = d.toISOString().slice(0, 10)
    UserService.getPublicContent(
      1,
      this.fromDate,
      this.toDate,
      this.searchTerm ? this.searchTerm : 'all',
    ).then(
      (response) => {
        this.inspections = response.data
      },
      (error) => {
        ;(error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString()
      },
    )
    this.currentPage = 1
  },
}
</script>
