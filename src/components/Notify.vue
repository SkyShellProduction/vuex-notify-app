<template>
  <table>
    <transition-group name="list" tag="tbody">
      <tr v-for="(message, index) in messages" :key="index">
        <td> <span>{{ message.title }}</span> </td>
      </tr>
    </transition-group>
    <button class="btn btnPrimary"
            :class="{btnDisabled: maxLength == 0}" 
            @click="loadMore" 
            :disabled="maxLength == 0">Load More</button>
  </table>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  computed: {
    maxLength() {
      return this.$store.getters.getMessageFilter.length;
    }
  },
  methods: {
    loadMore (){
      this.$store.dispatch('loadMessages')
      .catch(e => console.log(e))
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  text-align: center;
}
td {
  display: flex;
  justify-content: space-between;
  padding: 12px 6px;
  font-size: 14px;
}

/* Animation */
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

button {
  margin-top: 20px;
  &.btnDisabled {
    cursor: default;
    opacity: .6;
    border: none;
    background: rgb(146, 146, 146);
  }
}
</style>
