<template>
  <div class="container">
    <header class="header">
      <div class="logo-container">
        <img src="../assets/images/Logo.png" alt="Logo" class="logo" />
        <span class="logo-text">Lumen Studio</span>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/request" class="request-btn">Оставить заявку</router-link>
          </li>
          <li class="nav-item"><router-link to="/">Домой</router-link></li>
          <li class="nav-item"><router-link to="/project">Проект</router-link></li>
          <li class="nav-item"><router-link to="/blog">Блог</router-link></li>

          <li v-if="!isAuthorized">
            <router-link to="/login">Войти</router-link>
          </li>
          <li v-else>
            <button @click="logout" class="logout-btn">Выйти</button>
          </li>

          <li v-if="isAuthorized">
            <router-link to="/requests">Управление заявками</router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'VueHeader',
  data() {
    return {
      isAuthorized: localStorage.getItem('isAuthorized') === 'true',
    };
  },
  mounted() {
    window.addEventListener('auth-success', this.updateAuth);
    window.addEventListener('logout', this.updateAuth);
  },
  beforeDestroy() {
    window.removeEventListener('auth-success', this.updateAuth);
    window.removeEventListener('logout', this.updateAuth);
  },
  methods: {
    updateAuth() {
      this.isAuthorized = localStorage.getItem('isAuthorized') === 'true';
    },
    logout() {
      localStorage.removeItem('isAuthorized');
      window.dispatchEvent(new Event('logout'));
      this.$router.replace('/');
    }
  },
};

</script>

<style>
.logout-btn {
  background: none;
  border: none;
  color: #007BFF;
  cursor: pointer;
  font-size: 1em;
  padding: 0;
}
.logout-btn:hover {
  text-decoration: underline;
}

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

/* blog.html */

.blog-banner {
  height: 452px;
  margin-bottom: 0px;
}

.blog-banner-image {
  width: 100%;
  height: auto;
  
  
  
}

.container-blog {
  max-width: 1920px;
  margin: 0 auto;
}

.blog-intro {
  width: 503px;
  height: 274px;
  left: 708px;
  bottom: 178px;
  
 
  position: relative;
  background: white;
  border-top-left-radius: 37px;
  border-top-right-radius: 37px;

    
}

.blog-intro h1 {
  width: 347px;
  color: #292F36;
  font-size: 50px;
  font-family: DM Serif Display;
  font-weight: 400;
  line-height: 62.50px;
  word-wrap: break-word;
  margin-bottom: 0;
}

.links {
  width: 125px;
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
}


.blog-title {
  height: 192px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.latestPost {
    width: 1201px;
    height: 674px;
    
    
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 27px;
    display: inline-flex;
}

.latestPost h1 {
    color: #292F36;
    font-size: 50px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 62.50px;
    letter-spacing: 1px;
    word-wrap: break-word;
    margin: 0;
}

.latestPost-box {
  height: 584px;
  padding: 22px;
  box-shadow: 0px 10px 30px rgba(255, 255, 255, 0.25);
  border-radius: 62px;
  border: 1px #E7E7E7 solid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
}

.post {
    width: 1157px;
    justify-content: flex-start;
    align-items: center;
    gap: 65px;
    display: inline-flex;
}

.post-content {
  width: 489px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 41px;
    display: inline-flex;
}

.post-subcontent {
  height: 447px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 22px;
  display: flex;
}

.post-subcontent h3 {
  width: 463px;
    color: #292F36;
    font-size: 25px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 31.25px;
    letter-spacing: 0.50px;
    word-wrap: break-word;
    margin: 0;
}

.post-subcontent p {
  width: 469px;
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
}

.post-date {
    width: 489px;
    justify-content: flex-start;
    align-items: center;
    gap: 214px;
    display: inline-flex;
}

.post-date p {
    width: 223px;
    height: 33px;
    color: #4D5053;
    font-size: 16px;
    font-family: Jost;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 24px;
    letter-spacing: 0.16px;
    word-wrap: break-word;
}




@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');

body {
    margin: 0;
    font-family: "DM Serif Display", serif;
}
  
.container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .articles {
    text-align: center;
    margin-bottom: 40px;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 27px;
    
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

.category {
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

.button-flex {
    display: flex;
    justify-content: space-between;
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

.pagination {
  margin-top: 20px;
}
.pagination button {
  margin-right: 5px;
  padding: 5px 10px;
}








/* Blog details */
.Blog {
  justify-content: flex-start;
  align-items: flex-start;
  gap: 52px;
  display: inline-flex;
}

.article-details h1 {
    
    color: #292F36;
    font-size: 50px;
    font-family: DM Serif Display;
    font-weight: 400;
    line-height: 62.50px;
    letter-spacing: 1px;
    word-wrap: break-word;
}

.article-details p {
    
    margin: 0;
    color: #4D5053;
    font-size: 22px;
    font-family: Jost;
    font-weight: 400;
    line-height: 33px;
    letter-spacing: 0.22px;
    word-wrap: break-word;
}

.sidebar {
    width: 345px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 50px;
    display: inline-flex;
}

.tags {
    height: 200px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
    display: flex;
}

.tags p {
  color: #292F36;
  font-size: 25px;
  font-family: DM Serif Display;
  font-weight: 400;
  line-height: 31.25px;
  letter-spacing: 0.50px;
  word-wrap: break-word;
}

.tags-content {
  width: 300px;
  height: 145px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 11px;
  display: flex;
}

.tag {
  padding-left: 30px;
    padding-right: 30px;
    padding-top: 9px;
    padding-bottom: 9px;
    background: #F4F0EC;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    display: flex;
}

.tag.active {
  color: white;
  padding-left: 30px;
    padding-right: 30px;
    padding-top: 9px;
    padding-bottom: 9px;
    background: #292F36;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    display: flex;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
  border-radius: 0 0 8px 8px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 12px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-item a,
.logout-btn,
.request-btn {
  text-decoration: none;
  font-size: 1rem;
  color: #34495e;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
  background: transparent;
  border: none;
  cursor: pointer;
}

.nav-item a:hover,
.request-btn:hover,
.logout-btn:hover {
  background-color: #f0f0f0;
  color: #000;
}

.logout-btn {
  font-family: inherit;
}

</style>