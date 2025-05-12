<template>
  <div class="project-details container py-5">
    <div class="row justify-content-center mb-5">
      <div class="col-md-10 col-lg-8">
        <h1 class="mb-4 text-center">{{ name }}</h1>
        <p class="lead text-muted text-justify">
          Добро пожаловать в наш уникальный интерьерный проект! Здесь каждый элемент пространства продуман до мелочей: от цветовой палитры до расстановки мебели.
        </p>
        <p class="text-muted text-justify">
          Мы стремились создать уютное, функциональное и эстетически безупречное пространство, в котором будет комфортно жить, работать и отдыхать.
        </p>
        <p class="text-muted text-justify">
          Каждый проект — это отражение личности заказчика. Мы с вниманием относимся к деталям и любим комбинировать современные тренды с классическими решениями.
        </p>
      </div>
    </div>

    <div class="slider-wrapper mx-auto mb-4">
      <div id="carouselProjectImages" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner rounded-4 overflow-hidden shadow">
          <div
            v-for="(img, index) in images"
            :key="index"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <img :src="img" class="d-block w-100" :alt="`Изображение ${index + 1}`">
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselProjectImages"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Назад</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselProjectImages"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Вперёд</span>
        </button>

        <div class="carousel-indicators mt-3">
          <button
            v-for="(img, index) in images"
            :key="index"
            type="button"
            data-bs-target="#carouselProjectImages"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            :aria-label="`Слайд ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name'],
  name: 'ProjectDetails',
  data() {
    return {
      images: [
        '/assets/images/projectBedroom1.png',
        '/assets/images/projectBedroom2.png',
        '/assets/images/projectBedroom3.png',
      ]
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

.project-details {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

h1 {
  font-weight: 400;
  font-size: 2.5rem;
}

.lead,
.text-muted {
  text-align: justify;
}

.slider-wrapper {
  max-width: 850px;
}

.carousel-item img {
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
}

.carousel-indicators [data-bs-target] {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #bbb;
  opacity: 0.6;
}

.carousel-indicators .active {
  background-color: #555;
  opacity: 1;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}
</style>
