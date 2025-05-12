<template>
  <div>
    <div class="container-blog">
      <section class="blog-banner">
        <img src="../assets/images/projectBanner.png" alt="image" class="banner-img" />
        <div class="blog-intro">
          <div class="blog-title">
            <h1>Наш проект</h1>
            <div class="links">
              <a class="nav-link" href="index.html">Домой /</a>
              <a class="nav-link" href="blog.html">Проект</a>
            </div>  
          </div>
        </div>
      </section>
    </div>
    
    <div class="container">
      <!-- Фильтры по категориям -->
      <div class="category-filters">
        <button 
          v-for="(category, index) in categories" 
          :key="index" 
          @click="selectCategory(category)"
          :class="{'selected': selectedCategory === category}">
          {{ category }}
        </button>
      </div>

      <!-- Список проектов с фильтрацией -->
      <div class="project-list">
        <div v-for="(project, index) in filteredProjects" :key="index" class="project-item">
          <img :src="project.image" alt="Изображение проекта" class="project-img" />
          <h2>{{ project.name }}</h2>
          <p>{{ project.description }}</p>
          <button @click="goToProjectPage(project.name)">Перейти к проекту</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueProject',
  data() {
    return {
      projects: [
        { name: 'Современная кухня', description: 'Декор / Планировка', category: 'Кухня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Минималистичная спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Классическая спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная кухня', description: 'Декор / Планировка', category: 'Кухня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Гостинная в стиле лофт', description: 'Декор / Планировка', category: 'Гостинная', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная кухня', description: 'Декор / Планировка', category: 'Кухня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Минималистичная спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Классическая спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная кухня', description: 'Декор / Планировка', category: 'Кухня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Гостинная в стиле лофт', description: 'Декор / Планировка', category: 'Гостинная', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная кухня', description: 'Декор / Планировка', category: 'Кухня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Минималистичная спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Классическая спальня', description: 'Декор / Планировка', category: 'Спальня', image: '/assets/images/projectBedroom3.png' },
        { name: 'Современная кухня', description: 'Декор / Планировка', category: 'Кухня', image: '/assets/images/projectBedroom2.png' },
        { name: 'Гостинная в стиле лофт', description: 'Декор / Планировка', category: 'Гостинная', image: '/assets/images/projectBedroom3.png' },
        
      ],
      categories: ['Ванная комната', 'Спальня', 'Кухня', 'Гостинная'],
      selectedCategory: '',
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === '') {
        return this.projects;
      } else {
        return this.projects.filter(project => project.category === this.selectedCategory);
      }
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
goToProjectPage(projectName) {
  const encodedName = encodeURIComponent(projectName);
  this.$router.push(`/projects/${encodedName}`);
}

  }
};
</script>

<style scoped>
.container-blog {
  margin-bottom: 30px;
}

.blog-banner img {
  width: 100%;
  height: auto;
}

.blog-intro .blog-title h1 {
  font-size: 36px;
}

.category-filters {
  margin-top: 20px;
  margin-bottom: 20px;
}

.category-filters button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  cursor: pointer;
}

.category-filters button.selected {
  background-color: #007bff;
  color: white;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.project-item {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

.project-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.project-item h2 {
  font-size: 24px;
  margin: 10px 0;
}

.project-item button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.project-item button:hover {
  background-color: #0056b3;
}
</style>
