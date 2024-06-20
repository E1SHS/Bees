import { defineStore } from 'pinia';
import axios from 'axios';

export const useHiveStore = defineStore('hive', {
  state: () => ({
    hives: JSON.parse(localStorage.getItem('hives') || '[]') as number[],
  }),
  actions: {
    setHives(hives: number[]) {
      this.hives = hives;
      localStorage.setItem('hives', JSON.stringify(hives));
    },
    addHive(hive: number) {
      this.hives.push(hive);
      localStorage.setItem('hives', JSON.stringify(this.hives));
    },
    removeHive(hive: number) {
      this.hives = this.hives.filter(h => h !== hive);
      localStorage.setItem('hives', JSON.stringify(this.hives));
    },
    async fetchHives() {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('http://localhost:5001/auth/hives', { headers });
        this.setHives(response.data.map((hive: any) => hive.number));
      } catch (error) {
        console.error('Failed to fetch hives:', error);
      }
    },
  },
  getters: {
    hiveCount: (state) => state.hives.length,
  },
});
