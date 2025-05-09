<template>
  <div class="request-management">
    <h2>Управление заявками</h2>

    <div class="filters">
      <label for="statusFilter">Фильтр по статусу:</label>
      <select v-model="selectedStatus" id="statusFilter">
        <option value="">Все</option>
        <option v-for="status in statuses" :key="status" :value="status">
          {{ status }}
        </option>
      </select>

      <label for="search" style="margin-left: 20px;">Поиск:</label>
      <input
        id="search"
        v-model="searchQuery"
        placeholder="Имя, email или телефон"
        class="search-input"
      />
    </div>

    <table class="requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя клиента</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Тип дизайна</th>
          <th>Площадь (м²)</th>
          <th>Бюджет</th>
          <th>Описание</th>
          <th>Пожелания</th>
          <th>Дата заявки</th>
          <th>Последнее обновление</th>
          <th>Комментарий менеджера</th>
          <th>Файл-договор</th>
          <th>Файл-дизайн</th>
          <th>Статус</th>
          <th>Ответственный дизайнер</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in filteredRequests" :key="request.id">
          <td>{{ request.id }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.client_name" /></td>
          <td v-else>{{ request.client_name }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.email" /></td>
          <td v-else>{{ request.email }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.phone" /></td>
          <td v-else>{{ request.phone }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.design_type" /></td>
          <td v-else>{{ request.design_type }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.area" type="number" /></td>
          <td v-else>{{ request.area || '' }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.budget" type="number" /></td>
          <td v-else>{{ request.budget || '' }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.description" /></td>
          <td v-else>{{ request.description }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.notes" /></td>
          <td v-else>{{ request.notes || '—' }}</td>

          <td>{{ request.created_at }}</td>
          <td>{{ request.updated_at || '—' }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'"><input v-model="request.manager_comment" /></td>
          <td v-else>{{ request.manager_comment || '—' }}</td>

          <td>
          <div v-if="editingId === request.id && userRole !== 'designer'">
            <input type="file" @change="attachFile($event, request, 'contract_file')" />
            <div v-if="request.contract_file">✔ {{ request.contract_file.name || 'Файл прикреплён' }}</div>
          </div>
          <div v-else>
            <div v-if="request.contract_file">✔ {{ request.contract_file.name || 'Файл прикреплён' }}</div>
            <div v-else>—</div>
          </div>
          </td>

          <td>
          <div v-if="editingId === request.id && userRole === 'designer'">
            <input type="file" @change="attachFile($event, request, 'result_file')" />
            <div v-if="request.result_file">✔ {{ request.result_file.name || 'Файл прикреплён' }}</div>
          </div>
          <div v-else>
            <div v-if="request.result_file">✔ {{ request.result_file.name || 'Файл прикреплён' }}</div>
            <div v-else>—</div>
          </div>
          </td>

          <td v-if="editingId === request.id">
            <select v-model="request.status" @change="saveRequest(request)">
              <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
            </select>
          </td>
          <td v-else>{{ request.status }}</td>

          <td v-if="editingId === request.id && userRole !== 'designer'">
            <select v-model="request.designer_id">
              <option :value="null">—</option>
              <option v-for="designer in designers" :key="designer.id" :value="designer.id">
                {{ designer.name }}
              </option>
            </select>
          </td>
          <td v-else>{{ request.designer_name || '—' }}</td>

          <td>
            <template v-if="userRole !== 'designer'">
              <button v-if="editingId !== request.id" @click="startEdit(request)">Редактировать</button>
              <button v-else @click="saveRequest(request)">Сохранить</button>
              <button
                v-if="editingId === request.id && request.contract_file"
                @click="sendContract(request)"
                class="send-button"
              >
                Отправить договор
              </button>
            </template>
            <template v-else>
              <button v-if="editingId !== request.id" @click="startEdit(request)">Редактировать</button>
              <button v-else @click="saveRequest(request)">Сохранить</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'RequestManagement',
  data() {
    return {
      userRole: localStorage.getItem('userRole') || '',
      designerId: localStorage.getItem('userId') || '',
      searchQuery: '',
      selectedStatus: '',
      statuses: [
        'Новая',
        'В обработке',
        'Клиент недоступен',
        'Отказ',
        'Договор в обработке',
        'Завершено'
      ],
      requests: [],
      designers: [],
      editingId: null,
      autoUpdateInterval: null
    };
  },
  computed: {
    filteredRequests() {
      return this.requests
        .filter(r => !this.selectedStatus || r.status === this.selectedStatus)
        .filter(r => {
          const query = this.searchQuery.trim().toLowerCase();
          return (
            !query ||
            r.client_name.toLowerCase().includes(query) ||
            r.email.toLowerCase().includes(query) ||
            r.phone.toLowerCase().includes(query)
          );
        });
    }
  },
  methods: {
    async fetchRequests() {
      try {
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        const body = role === 'designer'
          ? JSON.stringify({ designer_id: userId })
          : null;

        const response = await fetch('http://lumen.local/get_requests.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body
        });

        const data = await response.json();
        this.requests = data;
      } catch (err) {
        console.error('Ошибка при загрузке заявок:', err);
        alert('Не удалось загрузить заявки с сервера.');
      }
    },
    async fetchDesigners() {
      try {
        const res = await fetch('http://lumen.local/get_designers.php');
        this.designers = await res.json();
      } catch (err) {
        console.error('Ошибка загрузки дизайнеров', err);
      }
    },
    startEdit(request) {
      this.editingId = request.id;
    },
    async saveRequest(request) {
      try {
        const formData = new FormData();

        for (const key in request) {
          if (Object.prototype.hasOwnProperty.call(request, key)) {
            let value = request[key];

            if (key === 'contract_file' && value instanceof File) {
              formData.append('contract_file', value);
            }
            if (key === 'result_file' && value instanceof File) {
              formData.append('result_file', value);
            }
            else {
              if (value === null || value === undefined || Number.isNaN(value)) {
                value = '';
              }
              formData.append(key, value);
            }
          }
        }

        const res = await fetch('http://lumen.local/update_request.php', {
          method: 'POST',
          body: formData
        });

        const result = await res.json();
        if (result.success) {
          alert('Заявка успешно обновлена.');
          this.editingId = null;
          this.fetchRequests();
        } else {
          throw new Error('Ошибка обновления');
        }
      } catch (err) {
        console.error(err);
        alert('Ошибка при сохранении заявки');
      }
    },
    attachFile(event, request, fileType) {
      const file = event.target.files[0];
      if (file) {
        request[fileType] = file;
        request.updated_at = new Date().toISOString().split('T')[0];
      }
    },
    async sendContract(request) {
      try {
        const formData = new FormData();
        for (const key in request) {
          if (Object.prototype.hasOwnProperty.call(request, key)) {
            let value = request[key];
            if (value === null || value === undefined || Number.isNaN(value)) {
              value = '';
            }
            formData.append(key, value);
          }
        }

        formData.append('force_send_contract', '1'); // <- ключевая строка

        const res = await fetch('http://lumen.local/update_request.php', {
          method: 'POST',
          body: formData
        });

        const result = await res.json();
        if (result.success) {
          alert('Договор отправлен клиенту.');
        } else {
          alert('Ошибка при отправке договора.');
        }
      } catch (err) {
        console.error(err);
        alert('Ошибка при отправке.');
      }
    }
  },
  mounted() {
    this.fetchRequests();
    this.fetchDesigners();
    this.autoUpdateInterval = setInterval(() => {
      if (this.editingId === null) {
        this.fetchRequests();
      }
    }, 10000); // каждые 10 секунд
  },
  beforeUnmount() {
    clearInterval(this.autoUpdateInterval);
  }
};
</script>



  
  
  <style scoped>
  .request-management {
    padding: 20px;
  }
  .filters {
    margin-bottom: 10px;
  }
  .requests-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .requests-table th,
  .requests-table td {
    border: 1px solid #ccc;
    padding: 6px;
    text-align: left;
  }
  .requests-table th {
    background-color: #f8f8f8;
  }
  .search-input {
    padding: 4px 8px;
    margin-left: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .send-button {
    margin-top: 5px;
    display: block;
    padding: 4px 8px;
    background-color: #2e86de;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .send-button:hover {
    background-color: #2163a8;
  }
  </style>
  