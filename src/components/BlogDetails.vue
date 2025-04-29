<template>
<div class="Blog">
    <div class="BlogDetails">
        <div class="article-details">
            <h1>{{ article.title }}</h1>
            <img src="../assets/images/blog-details1.png" alt="image">
            <p>{{ article.date }}</p>
            <div v-html="article.content"></div>
        </div>
        <div class="other-articles">
            <div v-for="article in filteredArticles" :key="article.id" class="article">
                <h2>{{ article.title }}</h2>
                <p>{{ article.date }}</p>
                <p>{{ article.excerpt }}</p>
            </div>
        </div>
    </div>
    <div class="sidebar">
        <div class="tags">
            <p>Тэги</p>
            <div class="tags-content">
                <span 
                    v-for="tag in tags" :key="tag" @click="filterByTag(tag)" :class="{ active: selectedTag === tag }"
                    class="tag">{{ tag }}
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'VueBlogDetails',

  data() {
    return {
        article: {
            title: 'Создадим лучший макет перепланировки',
            date: '26 Декабрь, 2024',
            content: `
              <p>В своей статье от 1994-го года журнал «Before & After» отследил фразу «Lorem ipsum ...» до философского трактата Цицерона О пределах добра и зла, написанного в 45 году до нашей эры на латинском языке.</p>
              <p>В оригинале текст выглядит так «Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit ...», и переводится как «Нет никого, кто любил бы свою боль, кто искал бы ее и хотел бы чтобы она была у него. Потому что это боль...»</p>
            `,
          },
          tags: ['Кухня', 'Спальня', 'Здание', 'Архитектура', 'Планировка'],
          selectedTag: null,
          articles: [
            { id: 1, title: 'Article 1', date: '2024-07-01', excerpt: 'Summary of article 1', tags: ['Кухня'] },
            { id: 2, title: 'Article 2', date: '2024-07-02', excerpt: 'Summary of article 2', tags: ['Спальня'] },
            { id: 3, title: 'Article 3', date: '2024-07-03', excerpt: 'Summary of article 3', tags: ['Архитектура'] },
            
          ], 
    };
  },
  
  computed: {
        filteredArticles() {
          if (!this.selectedTag) {
            return this.articles;
          }
          return this.articles.filter(article => article.tags.includes(this.selectedTag));
        },
      },

  methods: {
        filterByTag(tag) {
          this.selectedTag = tag;
        },
    },
};
</script>

<style>

</style>