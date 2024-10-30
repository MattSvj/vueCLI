<template>
    <div>
        <div class="container-blog">
            <section class="blog-banner">
                <img src="../assets/images/ProjectDetailsBanner.png" alt="image" class="">
            </section>
        </div>
        <div class="minimalistic-bedroom">
            <h1>Минималистичные спальни</h1>
            <p>{{ projectDescription }}</p>
            <div id="slider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block w-100" :src="require('@/assets/bedroom1.jpg')" alt="Bedroom 1">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" :src="require('@/assets/bedroom1.jpg')" alt="Bedroom 2">
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" :src="require('@/assets/bedroom1.jpg')" alt="Bedroom 3">
                </div>
            </div>
            <a class="carousel-control-prev" href="#slider" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#slider" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';

export default {
  name: 'VueProjectDetails',
  computed: {
    ...mapState(['projectDescription'])
  }
};
</script>
  
  <style>
  .minimalistic-bedroom {
  text-align: center;
}
.carousel-inner img {
  width: 100%;
  height: auto;
}
  </style>