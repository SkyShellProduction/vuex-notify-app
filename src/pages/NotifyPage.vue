<template>
  <div class="wrapper-content wrapper-content--fixed">
      <section>
            <div class="container">
                <div class="notify__wrapper">
                    <div class="notify-title">
                        <p>Notify App</p>
                        <img src="../assets/reload.svg" alt="" @click="$store.dispatch('getNotifyLazy')" class="reload">
                    </div>
                    <div class="notify__content">
                        <Preloader v-if="loading" :width="90" :height="90"/>
                        <div class="error" v-if="error">
                            <p>{{error}}</p>
                        </div>
                        <Notify
                        v-if="!loading && !error" 
                            :messages="messages"
                        />
                    </div>
                </div>
            </div>
      </section>
</div>
</template>
<script>
import Notify from '../components/Notify.vue';
import Preloader from '../components/UI/Preloader.vue';
export default {
    components: {
        Notify,
        Preloader
    },
    mounted () {
        this.$store.dispatch('getNotify');
    },
    computed: {
        messages () {
            return this.$store.getters.getMessageMain;
        },
        loading() {
            return this.$store.getters.getLoading;
        },
        error () {
            return this.$store.getters.getError
        }
    },
}
</script>
<style lang="scss" scoped>
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90vh;
    }
    .notify__wrapper{
        width: 400px;
        background: #fff;
        padding: 30px;
        border-radius: 16px;
        box-shadow: 0 12px 22px 0 rgba(0,0,0,.1);
    }
    .notify__content{
        display: flex;
        align-items: center;
        flex-direction: column;
        min-height: 300px;
    }
    .notify-title{
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
            margin-right: 15px;
        }
    }
    .reload{
        cursor: pointer;
    }
</style>