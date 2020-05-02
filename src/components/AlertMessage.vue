<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Alert',
    data(){
      return {
        messages:[],
      }
    },
    methods:{
      updateMessage(message, status){
        const timestamp = Math.floor(new Date()/1000);
        this.messages.push({
          message,
          status,
          timestamp,
        })
        this.removeMessageWithTiming(timestamp);
      },
      removeMessageWithTiming(timestamp){
        setTimeout(() => {
          this.messages.forEach((item, index) => {
            if(item.timestamp === timestamp){
              this.messages.splice(index, 1);
            }
          })
        }, 5000);
      },
      removeMessage(num){
        this.messages.splice(num, 1);
      },
    },
    created(){
      this.$bus.$on('message:push', (message, status) => {
        this.updateMessage(message, status);
      })
    }
  }
</script>

<style>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 76px;
  right: 20px;
  z-index: 1100;
}
</style>