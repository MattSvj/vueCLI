<template>
  <div class="request-management">
    <h2>Управление заявками</h2>

    <div class="filters">
      <select v-model="selectedStatus" id="statusFilter">
        <option value="">Все</option>
        <option
          v-for="status in statuses"
          :key="status"
          :value="status"
          :class="statusClass(status)"
        >
          {{ status }}
        </option>
      </select>

      <input
        id="search"
        v-model="searchQuery"
        placeholder="Имя, email или телефон"
        class="search-input"
      />
    </div>

    <button @click="addNewRequest" class="add-button">➕ Добавить заявку</button>
    
    <table class="requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Тип дизайна</th>
          <th>Площадь</th>
          <th>Бюджет</th>
          <th>Описание</th>
          <th>Дата</th>
          <th>Обновление</th>
          <th>Комментарий</th>
          <th>Файл-договор</th>
          <th>Файл-дизайн</th>
          <th>Статус</th>
          <th>Дизайнер</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in filteredRequests" :key="request.id">
          <td>{{ request.id }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.client_name" /></td>
          <td v-else>{{ request.client_name }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.email" /></td>
          <td v-else>{{ request.email }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.phone" /></td>
          <td v-else>{{ request.phone }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.design_type" /></td>
          <td v-else>{{ request.design_type }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.area" type="number" class="small-input" /></td>
          <td v-else>{{ request.area || '' }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.budget" type="number" class="small-input" /></td>
          <td v-else>{{ request.budget || '' }}</td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.description" /></td>
          <td v-else>{{ request.description }}</td>

          <td :title="request.created_at">{{ formatDateShort(request.created_at) }}</td>
          <td :title="request.updated_at">{{ formatDateShort(request.updated_at) || '—' }}</td>


          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'"><input v-model="request.manager_comment" /></td>
          <td v-else>{{ request.manager_comment || '—' }}</td>

          <td>
          <div v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'">
            <input type="file" @change="attachFile($event, request, 'contract_file')" />
            <div v-if="request.contract_file">✔ {{ request.contract_file.name || 'Файл' }}</div>
          </div>
          <div v-else>
            <div v-if="request.contract_file">✔ {{ request.contract_file.name || 'Файл' }}</div>
            <div v-else>—</div>
          </div>
          </td>

          <td>
          <div v-if="editingId === request.id && userRole === 'designer'">
            <input type="file" @change="attachFile($event, request, 'result_file')" />
            <div v-if="request.result_file">✔ {{ request.result_file.name || 'Файл' }}</div>
          </div>
          <div v-else>
            <div v-if="request.result_file">✔ {{ request.result_file.name || 'Файл' }}</div>
            <div v-else>—</div>
          </div>
          </td>

          <td v-if="editingId === request.id || request.id === null">
            <select
              v-model="request.status"
              :class="statusClass(request.status)"
              @change="saveRequest(request)"
            >
              <option
                v-for="status in statuses"
                :key="status"
                :value="status"
                :class="statusClass(status)"
              >
                {{ status }}
              </option>
            </select>
          </td>

          <td v-else :class="statusClass(request.status)">
            {{ request.status }}
          </td>

          <td v-if="(editingId === request.id || request.id === null) && userRole !== 'designer'">
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
                v-if="(editingId === request.id || request.id === null) && request.contract_file"
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
addNewRequest() {
  const newRequest = {
    id: 'new_' + Date.now(),
    client_name: '',
    email: '',
    phone: '',
    design_type: '',
    area: '',
    budget: '',
    description: '',
    created_at: new Date().toISOString(),
    updated_at: '',
    manager_comment: '',
    contract_file: null,
    result_file: null,
    status: 'Новая',
    designer_id: null,
    designer_name: ''
  };
  this.requests.unshift(newRequest);
  this.editingId = null;
  this.editingId = newRequest.id;
},

    formatDateShort(datetime) {
      if (!datetime) return '';
      return new Date(datetime).toLocaleDateString(); // или toISOString().slice(0, 10)
    },
    statusClass(status) {
    switch (status) {
      case 'Новая': return 'status-new';
      case 'В обработке': return 'status-processing';
      case 'Клиент недоступен': return 'status-unreachable';
      case 'Отказ': return 'status-declined';
      case 'Договор в обработке': return 'status-contract';
      case 'Завершено': return 'status-done';
      default: return '';
    }
  },
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
        } else if (key === 'result_file' && value instanceof File) {
          formData.append('result_file', value);
        } else if (key === 'id' && typeof value === 'string' && value.startsWith('new_')) {
          // Не добавляем временный id
          continue;
        } else {
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


  .request-management {
  max-width: 95%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

.request-management h2 {
  text-align: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.search-input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.requests-table {
  width: 100%;
  overflow-x: auto;
  display: block;
}

.requests-table table {
  border-collapse: collapse;
  min-width: 1200px;
  width: 100%;
}

.requests-table th, .requests-table td {
  border: 1px solid #ddd;
  padding: 8px;
  vertical-align: middle;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.requests-table th {
  background-color: #f5f5f5;
  font-weight: bold;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
}

button {
  padding: 5px 10px;
  margin: 2px;
  border: none;
  border-radius: 4px;
  background-color: #0077cc;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #005fa3;
}

.send-button {
  background-color: #28a745;
}

.send-button:hover {
  background-color: #218838;
}

input[type="file"] {
  max-width: 180px;
}

@media screen and (max-width: 768px) {
  .requests-table table {
    min-width: unset;
  }

  .filters {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Цвета статусов */
.status-new {
  background-color: #e0e0e0;
}

.status-processing {
  background-color: #cce5ff;
}

.status-unreachable {
  background-color: #ffeeba;
}

.status-declined {
  background-color: #f8d7da;
}

.status-contract {
  background-color: #e2d6f3;
}

.status-done {
  background-color: #d4edda;
}

/* Ограничение размеров input/select */
.requests-table input,
.requests-table select,
.requests-table textarea {
  width: 100%;
  max-width: 160px;
  box-sizing: border-box;
  padding: 4px;
  font-size: 14px;
}

/* Цвета для статусов */
.status-new           { background-color: #e0e0e0; }
.status-processing    { background-color: #cce5ff; }
.status-unreachable   { background-color: #ffeeba; }
.status-declined      { background-color: #f8d7da; }
.status-contract      { background-color: #e2d6f3; }
.status-done          { background-color: #d4edda; }

/* Обрезка длинных текстов с многоточием */
.ellipsis-cell {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Маленькие input для area и budget */
.small-input {
  width: 100%;
  max-width: 80px;
  padding: 4px;
  text-align: right;
  box-sizing: border-box;
}

/* Цвета для селекта и отображения статуса */
.status-label, .status-select {
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
  font-weight: 500;
  border: none;
  color: #000;
}

.status-new           { background-color: #e0e0e0; }
.status-processing    { background-color: #cce5ff; }
.status-unreachable   { background-color: #fff3cd; }
.status-declined      { background-color: #f8d7da; }
.status-contract      { background-color: #e2d6f3; }
.status-done          { background-color: #d4edda; }


.requests-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
}

.requests-table th,
.requests-table td {
  padding: 4px 6px;
  border: 1px solid #ccc;
  word-wrap: break-word;
  vertical-align: top;
}

.requests-table th {
  background-color: #f0f0f0;
}

.compact-table th,
.compact-table td {
  font-size: 11px;
}

.small-input {
  max-width: 60px;
  font-size: 11px;
}

.action-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 4px;
  font-size: 14px;
}
  </style>
  