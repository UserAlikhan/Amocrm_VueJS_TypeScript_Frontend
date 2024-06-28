<template>
  <div class="flex flex-col items-center justify-center">
      <div class=" flex flex-col items-center justify-center mt-10 mb-7">
        <h1 class=" text-xl text-black mb-5">Список Заказов</h1>
        <input class=" w-250px h-50px text-black font-mefium border" type="text" v-model="searchInput" placeholder="search..." />
      </div>
      <table class=" w-9/12 divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Бюджет</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ответственный</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(lead, idx) in leads" :key="lead.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-indigo-500 truncate">{{ lead.name }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ lead.price }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div :class="{ 'text-green-600 font-bold': lead.is_deleted === false, 'text-red-600 font-bold': lead.is_deleted === true }">
                {{ lead.is_deleted === false ? 'Активная Сделка' : 'Закрытая сделка' }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ contacts[idx]?.name }} {{ contacts[idx]?.first_name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ new Date(lead.created_by) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import axios from 'axios'
import Lead from './models/LeadModel'
import Contact from './models/ContactModel'

export default defineComponent({
  name: 'App',
  setup() {
      const leads = ref<Lead[]>([])
      const contacts = ref<Contact[]>([])
      const searchInput = ref('')

      const fetchData = async (searchTerm: string) => {
        const response = await axios.get(`http://localhost:3000/api/leads?leadsSearchParameter=${searchTerm}`)
        leads.value = response.data.leads
        contacts.value = response.data.contacts
      }

      onMounted(async () => {
        fetchData('')
      })

      console.log('leads ', leads)
      console.log('contacts ', contacts)

      watch(searchInput, (newSearchTerm: string) => {
      if (newSearchTerm.length > 1) {
        fetchData(newSearchTerm)
      } else {
        fetchData('')
      }
    })

      return { leads, contacts, searchInput }
  }
})
</script>

