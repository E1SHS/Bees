<template>
    <div class="container mt-5 shadow-container">
      <h1 class="mb-4 text-center text-muted">Bee Management Menu</h1>
      <h2 class="mb-4 text-center text-muted">Current Number of Hives: {{ hiveCount }}</h2>
      <form @submit.prevent="handlesubmit" class="text-center">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToFeedBees">
              <i class="bi bi-box-seam"></i> Feed Bees
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToMiteAssessment">
              <i class="bi bi-bug"></i> Mite Assessment
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToHarvestHoney">
              <i class="bi bi-archive"></i> Harvest Honey
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToDeadHive">
              <i class="bi bi-x-octagon"></i> Dead Hive
            </button>
          </div>
          <div class="col-12 col-md-6">
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToDocumentFlora">
              <i class="bi bi-file-earmark-text"></i> Document Flora
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToTreatment">
              <i class="bi bi-file-earmark-medical"></i> Treatment
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToWinterize">
              <i class="bi bi-snow"></i> Winterize
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToLogSymptoms">
              <i class="bi bi-journal-text"></i> Log Symptoms
            </button>
          </div>
          <div class="col-12">
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="navigateToRequeen">
              <i class="bi bi-award"></i> Requeen
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="showDeleteHiveModal">
              <i class="bi bi-dash-circle"></i> Delete Hive
            </button>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-3 shadow-button" @click="addHive">
              <i class="bi bi-plus-circle"></i> Add Hive
            </button>
          </div>
        </div>
      </form>
  
      <!-- Delete Hive Modal -->
      <div v-if="isDeleteModalVisible" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeDeleteHiveModal">&times;</span>
          <h2>Delete Hive</h2>
          <select v-model="selectedHiveId">
            <option v-for="hive in hives" :key="hive._id" :value="hive._id">{{ hive.name }}</option>
          </select>
          <button class="btn btn-danger mt-3" @click="deleteHive">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import type { Hive } from '../types'; // Adjust the path as needed
  import type { AxiosResponse } from 'axios';
  
  export default defineComponent({
    data() {
      return {
        hives: [] as Hive[],
        selectedHiveId: null as string | null,
        isDeleteModalVisible: false
      };
    },
    computed: {
      hiveCount(): number {
        return this.hives.length;
      }
    },
    methods: {
      handlesubmit() {
        console.log('Form submitted');
      },
      async addHive() {
        try {
          const response: AxiosResponse<Hive> = await axios.post('http://localhost:5001/api/hives', {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.hives.push(response.data);
          alert('Hive added successfully');
        } catch (error) {
          console.error('Error adding hive:', error);
          alert('Failed to add hive');
        }
      },
      async fetchHives() {
        try {
          const response: AxiosResponse<Hive[]> = await axios.get('http://localhost:5001/api/hives', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.hives = response.data;
        } catch (error) {
          console.error('Error fetching hives:', error);
        }
      },
      showDeleteHiveModal() {
        this.fetchHives();
        this.isDeleteModalVisible = true;
      },
      closeDeleteHiveModal() {
        this.isDeleteModalVisible = false;
      },
      async deleteHive() {
        try {
          await axios.delete(`http://localhost:5001/api/hives/${this.selectedHiveId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.hives = this.hives.filter(hive => hive._id !== this.selectedHiveId);
          this.closeDeleteHiveModal();
          alert('Hive deleted successfully');
        } catch (error) {
          console.error('Error deleting hive:', error);
          alert('Failed to delete hive');
        }
      },
      navigateToFeedBees() {
        console.log('Navigating to feed bees route');
        this.$router.push({ name: 'feed' });
      },
      navigateToDocumentFlora() {
        console.log('Navigating to document flora route');
        this.$router.push({ name: 'flora' });
      },
      navigateToMiteAssessment() {
        console.log('Navigating to mite assessment route');
        this.$router.push({ name: 'mite' });
      },
      navigateToTreatment() {
        console.log('Navigating to treatment route');
        this.$router.push({ name: 'treatment' });
      },
      navigateToHarvestHoney() {
        console.log('Navigating to harvest honey route');
        this.$router.push({ name: 'harvesthoney' });
      },
      navigateToWinterize() {
        console.log('Navigating to winterize route');
        this.$router.push({ name: 'winterize' });
      },
      navigateToDeadHive() {
        console.log('Navigating to dead hive route');
        this.$router.push({ name: 'deadhive' });
      },
      navigateToLogSymptoms() {
        console.log('Navigating to log symptoms route');
        this.$router.push({ name: 'logsymptoms' });
      },
      navigateToRequeen() {
        console.log('Navigating to requeen route');
        this.$router.push({ name: 'requeen' });
      }
    },
    mounted() {
      this.fetchHives();
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  
  .shadow-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
  }
  
  .btn-lg {
    font-size: 1.25rem;
    transition: transform 0.2s, background-color 0.2s;
  }
  
  .btn-lg:hover {
    transform: scale(1.05);
  }
  
  .shadow-button {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-family: 'Nunito Sans', sans-serif;
    color: #6c757d;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  