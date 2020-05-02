<template>
  <div>
    <nav class="d-flex justify-content-center" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item changePageIcon" :class="{'disabled': !childPaginations.has_pre}" @click.prevent="changePage(childPaginations.current_page - 1)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span><!--上一頁-->
          </a>
        </li>
        <li class="page-item" v-for="page in childPaginations.total_pages" :key="page" :class="{'active': childPaginations.current_page === page}" @click.prevent="changePage(page)">
          <a class="page-link" href="#">{{ page }}</a>
          </li>
        <li class="page-item changePageIcon" :class="{'disabled': !childPaginations.has_next}" @click.prevent="changePage(childPaginations.current_page + 1)">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span><!--下一頁-->
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name:'Pagination',
    props:{
      childPaginations:{
        type:Object,
      }
    },
    data(){
      return {

      }
    },
    methods:{
      changePage(currentPage){
        this.$emit('changePage', currentPage);
      }
    }

  }
</script>

<style>

</style>