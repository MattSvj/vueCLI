<template>
    <body>
  <div class="container">
    <section class="banner">
        <img src="@/assets/images/Image.png" alt="image" class="banner-image">
        <div class="banner-content">
            <h1>Пусть ваш дом <br> будет уникальным</h1>
            <p>Существует много вариантов Lorem Ipsum, которые можно использовать</p>
            <button class="banner-button">Начать <img src="@/assets/images/Vector.png" alt="arrow"></button>
        </div>
    </section>
  </div>

  <div class="container">
    <div class="project-intro">
        <h1>Следите за нашими проектами</h1>
        <p>Хорошо известно, что читатель будет отвлекаться <br> на читабельный контент страницы</p>
    </div>
    <section class="projects">
      <div class="project-card">
        <img src="@/assets/images/Image2.png" alt="Современная кухня">
        <div class="card-content">
          <div class="project-info">
            <h3>Современная кухня</h3>
            <p>Декор / Планировка</p>
          </div>
          <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button>
        </div>
      </div>
      <div class="project-card">
        <img src="@/assets/images/Image3.png" alt="Современная кухня">
        <div class="card-content">
          <div class="project-info">
            <h3>Современная кухня</h3>
            <p>Декор / Планировка</p>
          </div>
          <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button>
        </div>
      </div>
      <div class="project-card">
        <img src="@/assets/images/Image4.png" alt="Современная кухня">
        <div class="card-content">
          <div class="project-info">
            <h3>Современная кухня</h3>
            <p>Декор / Планировка</p>
          </div>
          <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button>
        </div>
      </div>
      <div class="project-card">
        <img src="@/assets/images/Image5.png" alt="Современная кухня">
        <div class="card-content">
          <div class="project-info">
            <h3>Современная кухня</h3>
            <p>Декор / Планировка</p>
          </div>
          <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button>
        </div>
      </div>
    </section>
  </div>

    <section class="stats">
      <div class="stat">
        <div class="stat-number">12</div>
        <p>Лет опыта</p>
      </div>
      <img src="@/assets/images/Line.png" alt="line" class="stat-line">
      <div class="stat">
        <div class="stat-number">85</div>
        <p>Успешных проектов</p>
      </div>
      <img src="@/assets/images/Line.png" alt="line" class="stat-line">
      <div class="stat">
        <div class="stat-number">15</div>
        <p>Проектов в работе</p>
      </div>
      <img src="@/assets/images/Line.png" alt="line" class="stat-line">
      <div class="stat">
        <div class="stat-number">95</div>
        <p>Счастливых клиентов</p>
      </div>
    </section>

  <div class="container">
    <section class="articles">
      <h2>Статьи & <br> Новости</h2>
      <p>Хорошо известно, что читатель будет отвлекаться <br> на читабельный контент страницы</p>
      <div class="articles-grid">
        <div class="article-card">
          <img src="@/assets/images/Image6.png" alt="Article 1">
          <div class="article-info">
            <div class="article-category">Дизайн Кухни</div>
            <h3>Создадим лучший макет перепланировки</h3>
            <div class="button-flex"><p>26 Декабрь, 2024</p> <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button></div>
          </div>
        </div>
        <div class="article-card">
          <img src="@/assets/images/Image7.png" alt="Article 2">
          <div class="article-info">
            <div class="article-category">Дизайн Для Жизни</div>
            <h3>Лучшие интерьерные идеи по низкой цене</h3>
            <div class="button-flex"><p>26 Декабрь, 2024</p> <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button></div>
          </div>
        </div>
        <div class="article-card">
          <img src="@/assets/images/Image8.png" alt="Article 3">
          <div class="article-info">
            <div class="article-category">Дизайн Интерьера</div>
            <h3>Лучшие интерьерные решения для офисов</h3>
            <div class="button-flex"><p>26 Декабрь, 2024</p> <button class="project-card-button"><img src="@/assets/images/project-card-button.png" alt="button"></button></div>
          </div>
        </div>
      </div>
    </section>
</div>
</body>
</template>

<script>
export default {
  name: 'VueMainPage',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

body {
    margin: 0;
    font-family: "DM Serif Display", serif;
}
  
.container {
    max-width: 1200px;
    margin: 0 auto;
  }

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 44px;
    margin-bottom: 57px;
}

.logo-container {
    display: flex;
    align-items: center;
}

.logo {
    width: 34px;
    height: 34px;
    margin-right: 10px;
}

.logo-text {
    color: #292F36;
    font-size: 40px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 50px;
    font-weight: bold;
}

.nav-list {
    height: 25px;
    justify-content: flex-end;
    align-items: center;
    gap: 31px;
    display: flex;
    text-align: center;
    color: #292F36;
    font-size: 20px;
    font-family: Jost;
    font-weight: 400;
    line-height: 25px;
    list-style: none;
    

}

.nav-item {
    margin-left: 20px; 
}

.nav-link {
    text-decoration: none;
    color: #292F36;
    
}

.nav-link:hover {
    text-decoration:underline;
}





  

  
.banner {
    position: relative;
    max-width: 1200px; 
    border-radius: 10px;
    overflow: hidden;
  }
  
  .banner-image {
    width: 100%;
    display: block;
    opacity: 1; 
  }
  
  .banner-content {
    position: absolute;
    top: 150px; 
    left: 52px; 
    
  }
  
  .banner h1 {
    color: #292F36;
    font-size: 65px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 81.25px;
    word-wrap: break-word;
    margin-bottom: 10px;
  }
  
  .banner p {
    width: 433px;
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
    margin-bottom: 20px;
  }
  
  .banner-button {
    padding-top: 26px;
    padding-bottom: 26px;
    padding-left: 48px;
    padding-right: 49px;
    background: #292F36;
    box-shadow: 0px 10px 20px rgba(192.31, 192.31, 192.31, 0.35);
    border-radius: 18px;
    flex-direction:row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    display: flex;
    text-align: center;
    color: white;
    font-size: 18px;
    font-family: Jost;
    font-weight: 600;
    line-height: 22.50px;
    letter-spacing: 0.36px;
    
  }

 


  
  .banner-button:hover {
    background-color: #333; 
  }
  
  .project-intro {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    margin-top: 96px;
    margin-bottom: 93px;
    gap: 8px;

  }

  .project-intro h1 {
    text-align: center;
    color: #292F36;
    font-size: 50px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 62.50px;
    letter-spacing: 1px;
    word-wrap: break-word;
    margin: 0;
  }
  .project-intro p {
    width: 737px;
    text-align: center;
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
    margin: 0;
  }
  
  .projects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 104px;
    grid-row-gap: 56px;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 96px;
  }
  
  .project-card {
    background: #fff;
    
  }
  
  .project-card img {
    width: 100%;
    height: auto;
    display: block;
    
  }
  
  .project-card-button {
    width: 52px;
    height: 52px;
    left: 0px;
    top: 0px;
    border: none;
    background: #F4F0EC;
    border-radius: 9999px;
  }

  .project-card-button:hover {
    background-color: #838181; 
  }
  
  .project-info h3 {
    
    color: #292F36;
    font-size: 25px;
    font-family: DM Serif Display;
    margin: 0;
    padding: 0;
    margin-bottom: 4px;
  }
  
  .project-info p {
    
    color: #4D5053;
    font-size: 22px;
    font-family: DM Serif Display;
    
    
    margin: 0;
    padding: 0;
  }

  .card-content {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    
  }
  
  .stats {
    background: #F4F0EC;
    height: 457px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    text-align: center;
    align-items: center;
    gap: 54px;
    margin-bottom: 40px;
  }
  
  .stat-line {
    height: 210px;
    width: 0px;
    border: 1px #CDA274 solid;
  }
  
  .stat {
    
    font-size: 1.5rem;
  }

  .stat p {
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
  }
  
  .stat-number {
    font-size: 95px;
    color: #CDA274;
    font-family: DM Serif Display;
  }
  
  .articles {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .articles h2 {
    margin: 0;
    text-align: center;
    color: #292F36;
    font-size: 50px;
    font-family: DM Serif Display;
    font-weight: 400;
  }
  
  .articles p {
    margin-top: 12px;
    text-align: center;
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    
    
    margin-bottom: 52px;
  }
  
  .articles-grid {
    justify-content: center;
    align-items: flex-start;
    gap: 27px;
    display: inline-flex;
  }
  
  .article-card {
    
    padding: 21px;
    
    
    box-shadow: 0px 10px 30px rgba(255, 255, 255, 0.25);
    border-radius: 62px;
    border: 1px #E7E7E7 solid;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    
    
  }
  
  .article-card img {
    width: 100%;
    height: auto;
  }
  
  
  .article-category {
    position: relative;
    width: 124px;
    height: 41px;
    
    left: 10px;
    bottom: 70px;
  
    background: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    color: #4D5053;
    font-size: 16px;
    font-family: Jost;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 24px;
    letter-spacing: 0.16px;
    
  }
  
  .article-info h3 {
    margin-top: 0;
    text-align: left;
    color: #292F36;
    font-size: 25px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 31.25px;
    letter-spacing: 0.50px;
    word-wrap: break-word;
  }
  
  .article-info p {
    text-align: left;
    color: #4D5053;
    font-size: 16px;
    font-family: Jost;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 24px;
    letter-spacing: 0.16px;
    word-wrap: break-word;
  }
  
  .button-flex {
    display: flex;
    justify-content: space-between;
  }


  .footer {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    
    
    
  }
  
  
  .footer-links a {
    
    color: #333;
    text-decoration: none;
    font-size: 1rem;
    color: #292F36;
    font-size: 22px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 31.25px;
    word-wrap: break-word;
    margin-bottom: 20px;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  
  .footer p {
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
  }

  .footer h1 {
    color: #4D5053;
    font-size: 25px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
  }
  
  .footer-socialmedia h1 {
    color: #292F36;
    font-size: 40px;
    font-family: DM Serif Display;
    
  }

  .footer-socialmedia a {
    margin-right: 54px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
  }

  .logo-flex {
    display: flex;
    align-items: center;
  }

  
</style>