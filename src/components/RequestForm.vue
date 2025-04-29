<template>
    <div class="form-page">
      <h2>Оставьте заявку</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label>Имя:</label>
          <input v-model="form.name" type="text" required />
        </div>
        <div>
          <label>Телефон:</label>
          <input
            v-model="form.phone"
            v-mask="'+7 ### ### ## ##'"
            placeholder="+7 ___ ___ __ __"
            required
            />
        </div>
        <div>
          <label>Email:</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "RequestForm",
    data() {
      return {
        form: {
          name: '',
          phone: '',
          email: '',
        },
        error: '',
        success: '',
      };
    },
    methods: {
      // Валидация: только +7 и 10 цифр, без пробелов
      validatePhone(cleanPhone) {
        const pattern = /^\+7\d{10}$/;
        return pattern.test(cleanPhone);
      },
  
      validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
      },
  
      submitForm() {
        this.error = '';
        this.success = '';
  
        if (!this.form.name) {
          this.error = 'Пожалуйста, введите имя.';
          return;
        }
  
        // Очищаем пробелы из номера
        const cleanPhone = this.form.phone.replace(/\s+/g, '');
  
        if (!this.validatePhone(cleanPhone)) {
          this.error = 'Неверный формат номера. Пример: +7 999 999 99 99';
          return;
        }
  
        if (!this.validateEmail(this.form.email)) {
          this.error = 'Неверный формат электронной почты.';
          return;
        }
  
        // Здесь cleanPhone готов к сохранению в БД
        console.log("Готов к записи:", cleanPhone);
  
        this.success = 'Спасибо! Мы свяжемся с вами в рабочее время.';
  
        // Очистка формы, если нужно
        // this.form = { name: '', phone: '', email: '' };
      }
    }
  };
  </script>
  
  
  <style scoped>
  .form-page {
  max-width: 500px;
  margin: 60px auto;
  padding: 30px;
  background-color: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}

form div {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 14px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 16px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: #dc3545;
  font-weight: 500;
  margin-top: -8px;
  margin-bottom: 8px;
}

.success {
  color: #28a745;
  font-weight: 500;
  margin-top: -8px;
  margin-bottom: 8px;
}

  </style>
  