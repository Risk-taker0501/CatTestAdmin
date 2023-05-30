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
            Add Scenario
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
              <CModalTitle>Create Scenario</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                label="ScenarioID"
                placeholder="Enter ScenarioID"
                v-model="scenarioId"
                required
              /><CFormInput
                type="text"
                label="type"
                placeholder="Enter Type"
                v-model="type"
                required
              /><CFormInput
                type="text"
                label="Goal"
                placeholder="Enter Goal"
                v-model="goal"
                required
              /><CFormTextarea
                label="Description"
                rows="5"
                v-model="description"
                required
              ></CFormTextarea>
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
                @click.="addScenario()"
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
                showModal1 = false
              }
            "
          >
            <CModalHeader>
              <CModalTitle>Edit Scenario</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CFormInput
                type="text"
                label="ScenarioID"
                placeholder="Enter ScenarioID"
                v-model="scenarioId"
                disabled
                required
              /><CFormInput
                type="text"
                label="type"
                placeholder="Enter Type"
                v-model="type"
                required
              /><CFormInput
                type="text"
                label="Goal"
                placeholder="Enter Goal"
                v-model="goal"
                required
              /><CFormTextarea
                label="Description"
                rows="5"
                v-model="description"
                required
              ></CFormTextarea>
            </CModalBody>
            <CModalFooter>
              <CButton
                color="secondary"
                @click="
                  () => {
                    showModal1 = false
                  }
                "
              >
                Close
              </CButton>
              <CButton
                style="background-color: #003b5c; color: white"
                @click.="addScenario()"
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
                ScenarioID
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Type</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Description
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Goal</CTableHeaderCell>
              <CTableHeaderCell class="text-center">
                Created ON
              </CTableHeaderCell>
              <CTableHeaderCell class="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow v-for="(scenario, index) in scenarios" :key="index">
              <CTableDataCell class="text-center">
                {{ scenario.scenarioId }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ scenario.type }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ scenario.description }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ scenario.goal }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                {{ scenario.createdAt }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <CButton
                    style="background-color: #003b5c; color: white"
                    @click="
                      () => {
                        scenarioId = scenario.scenarioId
                        type = scenario.type
                        description = scenario.description
                        goal = scenario.goal
                        showModal1 = true
                      }
                    "
                  >
                    Edit
                  </CButton>
                  <CButton
                    style="background-color: #c8102e; color: white"
                    @click="deleteScenario(scenario._id)"
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
  name: 'Scenario',
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      scenarios: '',
      showModal: false,
      showModal1: false,
      scenarioId: '',
      type: '',
      goal: '',
      description: '',
      create_At: '',
    }
  },
  methods: {
    addScenario() {
      const scenario = {
        scenarioId: this.scenarioId,
        type: this.type,
        goal: this.goal,
        description: this.description,
      }
      UserService.postScenario(scenario).then(
        (response) => {
          response
          UserService.getScenario().then(
            (response) => {
              const scenarios = response.data
              let s = scenarios.map((scenario) => {
                let date = new Date(scenario.createdAt)
                scenario.createdAt = date.toLocaleString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })
                return scenario
              })
              this.scenarios = s
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
      this.scenarioId = ''
      this.type = ''
      this.goal = ''
      this.description = ''
      this.create_At = ''
      this.showModal = false
      this.showModal1 = false
    },
    deleteScenario(scenario_id) {
      if (!window.confirm('Are you sure you want to delete this item?')) return
      UserService.delScenario(scenario_id).then((response) => {
        response
        UserService.getScenario().then(
          (response) => {
            const scenarios = response.data
            let s = scenarios.map((scenario) => {
              let date = new Date(scenario.createdAt)
              scenario.createdAt = date.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              return scenario
            })
            this.scenarios = s
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
    UserService.getScenario().then(
      (response) => {
        const scenarios = response.data
        let s = scenarios.map((scenario) => {
          let date = new Date(scenario.createdAt)
          scenario.createdAt = date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
          return scenario
        })
        this.scenarios = s
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
