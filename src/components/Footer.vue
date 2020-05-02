<template>
  <div class="bg-primary p-4 text-center">
    <div class="mb-4">
      <a href="#" class="mr-1"><img src="../assets/image/icon_twitter.png" alt="twitter" width="40px" height="40px"></a>
      <a href="#" class="mr-1"><img src="../assets/image/icon_fb.png" alt="facebook" width="40px" height="40px"></a>
      <a href="https://github.com/ladymei96/vueFinal_hw" class="mr-1" title="前往我的GitHub" target="_blank"><img src="../assets/image/icon_github.png" alt="github" width="40px" height="40px"></a>
    </div>
    <div class="text-info">&copy;Copyright {{ year }} by mei<br class="d-block d-sm-none">僅供學習使用 無商業行為</div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

