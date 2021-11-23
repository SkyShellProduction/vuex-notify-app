import loadMore from "../assets/js/loadMore";
import loading from "./loading";
import error from "./error";
import axios from 'axios';
export default {
    state: {
        messages: [],
        messagesMain: [],
        addingNotifyCount: 2
    },
    modules: {
        loading,
        error
    },
    mutations: {
        setMessage (state, payload) {
            state.messages = payload
        },
        setMessageMain (state, payload) {
            state.messagesMain = payload
        },
        loadMessages (state, payload) {
            state.messagesMain = state.messagesMain.concat(payload);
        },
        getNotify(state, payload) {
            state.messages = payload[0].messages;
            state.messagesMain = payload[0].messagesMain;
        },
    },
    actions: {
        setMessage ({commit}, payload) {
            commit('setMessage', payload);
        },
        setMessageMain ({commit}, payload) {
            commit('setMessageMain', payload);
        },
        loadMessages ({commit, getters}){
            let res = getters.getMessageFilter;
            let count = getters.getAddingNotifyCount
            commit('loadMessages', loadMore(res, count));
        },
        getNotify({commit}){
            commit('setLoading', true);
            axios.get('https://my-json-server.typicode.com/skyshellproduction/notify/db')
            .then(res => {
                let data = res.data.notify,
                    messages = [],
                    messagesMain = [];
                for (let i = 0; i < data.length; i++) {
                    if(data[i].main) messagesMain.push(data[i]);
                    else messages.push(data[i]);
                }
                commit('getNotify', [{messages, messagesMain}]);
            })
            .catch(e => commit('setError', 'Error: Network Error'))
            .finally(() => {commit('setLoading', false);});
        },
        getNotifyLazy({commit}){
            commit('setLoading', true);
            setTimeout(() => {
                this.dispatch('getNotify');
            }, 800);
        }
    },
    getters: {
        getMessage: state => state.messages,
        getMessageMain: state => state.messagesMain,
        getMessageFilter: state => state.messages.filter(item => item.main === false),
        getAddingNotifyCount: state => state.addingNotifyCount,
    }
}