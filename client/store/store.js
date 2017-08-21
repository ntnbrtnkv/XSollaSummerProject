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
        state.isFetchingSearchData = true;
        return new Promise((resolve, reject) => {
            api.search(value,
                res => {
                    state.isFetchingSearchData = false;
                    resolve(res);
                },
                reject);
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

    getDrugById(id, resolve, reject) {
        axios.get(`${host}/drugs/${id}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
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

    [MutationTypes.SET_FETCH_FLAG] (state, flag) {
        state.isFetchingSearchData = flag;
    },

    [MutationTypes.START_SEARCHING] (state) {
        state.isSearching = true;
    },

    [MutationTypes.CLEAR_SEARCH_RESULTS] (state) {
        state.currentDrug = {};
        state.foundDrugList = [];
    },

    [MutationTypes.END_SEARCHING] (state) {
        state.isSearching = false;
    },

    [MutationTypes.SET_SESSION_ID] (state, newID) {
        state.sessionID = newID;
    },

    [MutationTypes.SET_DRUG_BY_ID] (state, id) {
        const value = state.favDrugsList.find(el => el.id === id);
        if (value) {
            Vue.set(state, 'currentDrug', value);
        } else {
            api.getDrugById(id, res => Vue.set(state, 'currentDrug', res), err => console.log(err));
        }
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
    isFetchingSearchData: false,
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
