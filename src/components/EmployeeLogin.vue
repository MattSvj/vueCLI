<template>
    <div class="auth-container">
      <h2>Авторизация сотрудника</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="btn">Войти</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmployeeLogin',
    data() {
      return {
        email: '',
        password: '',
        error: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://lumen.local/auth.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });
  
          const result = await response.json();
  
          if (result.success) {
            localStorage.setItem('isAuthorized', 'true');
            localStorage.setItem('userRole', result.role); // сохраним роль, если надо
  
            window.dispatchEvent(new Event('auth-success'));
            this.$router.replace('/').catch(err => {
              if (err.name !== 'NavigationDuplicated') {
                throw err;
              }
            });
          } else {
            this.error = result.message;
          }
        } catch (err) {
          console.error('Ошибка авторизации:', err);
          this.error = 'Ошибка соединения с сервером.';
        }
      },
    },
  };
  </script>
  
  
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  .error {
    color: red;
    margin-top: 10px;
  }

  </style>
  
  <style scoped>
.auth-container {
  max-width: 400px;
  margin: 80px auto;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-container h2 {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #0077ff;
  box-shadow: 0 0 0 3px rgba(0, 119, 255, 0.1);
}

.error {
  color: #d9534f;
  margin-bottom: 12px;
}

.btn {
  background-color: #0077ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #005fcc;
}
</style>
