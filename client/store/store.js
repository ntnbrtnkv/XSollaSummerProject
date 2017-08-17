import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import MutationTypes from './mutation-types';
import ActionTypes from './action-types';
import Config from "./../../config.json";

Vue.use(Vuex);

const host = `${Config.apiServer.host}:${Config.apiServer.port}`;

const actions = {
    [ActionTypes.SEARCH_DRUG] ({ state }, value) {
        return new Promise((resolve, reject) => {
            api.search(value, resolve, reject);
        });
    },

    [ActionTypes.GET_ACTUAL_SESSION_INFO] (state, cookieSessionID) {
        return new Promise( (resolve, reject) => {
            api.getInfoById(cookieSessionID, resolve, reject);
        });
    }
};

const api = {
    search(searchString, resolve, reject) {
        axios.get(`${host}/drugs?q=${searchString}&_limit=10`)
            .then(resolve)
            .catch(reject);
    },

    registerSession(resolve, reject) {
        axios.post(`${host}/sessions`, {
            'drugs': []
        })
            .then(resolve)
            .catch(reject);
    },

    getInfoById(id, resolve, reject) {
        axios.get(`${host}/sessions/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                api.registerSession(res => {
                    resolve(res.data);
                }, reject);
            });
    },
};

const getters = {
    favDrugsIdList: (state) => {
        return state.favDrugsList.map(el => el.id);
    },
};

const mutations = {
    [MutationTypes.DELETE_FAV_DRUG] (state, drug) {
        state.favDrugsList.splice(state.favDrugsList.indexOf(drug), 1);
        axios.patch(`${host}/sessions/${state.sessionID}`, {
            "drugs": state.favDrugsList
        });
    },

    [MutationTypes.START_SEARCHING] (state) {
        state.isSearching = true;
    },

    [MutationTypes.END_SEARCHING] (state) {
        state.isSearching = false;
        state.currentDrug = {};
        state.foundDrugList = [];
    },

    [MutationTypes.SET_SESSION_ID] (state, newID) {
        state.sessionID = newID;
    },

    [MutationTypes.SET_DRUG_BY_ID] (state, id) {
        const value = state.favDrugsList.find(el => el.id === id);
        Vue.set(state, 'currentDrug', value);
    },

    [MutationTypes.SET_FOUND_DRUG_LIST] (state, drugs) {
        state.foundDrugList = drugs || [];
    },

    [MutationTypes.SET_FAV_DRUG_LIST] (state, drugs) {
        state.favDrugsList = drugs || [];
    },

    [MutationTypes.ADD_FAV_DRUG] (state, drug) {
        function sortedIndex (array, value) {
            let low = 0;
            let high = array.length;
            const loweredName = value.name.toLowerCase();

            while (low < high) {
                const mid = (low + high) >>> 1;
                if (array[mid].name.toLowerCase() < loweredName) low = mid + 1;
                else high = mid;
            }
            return low;
        }

        const array = state.favDrugsList;
        if (array.some(e => e.id === drug.id)) return;
        const indexToPush = sortedIndex(array, drug);

        array.splice(indexToPush, 0, drug);
        axios.patch(`${host}/sessions/${state.sessionID}/`, {
            "drugs": array
        });
    }
};

const state = {
    isSearching: false,
    sessionID: '',
    currentDrug: {},
    foundDrugList: [],
    favDrugsList: []
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store
