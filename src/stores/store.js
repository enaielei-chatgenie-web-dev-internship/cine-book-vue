import { defineStore } from "pinia";

import {computed, reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useQuery, useMutation, provideApolloClient} from '@vue/apollo-composable';
import gql from 'graphql-tag';

import api from "./../assets/api.js";

export default defineStore({
    id: "store",
    state() {return {
        messages: [],
        
        // Queries
        _signedIn: useQuery(api.users, {filter:
            {condition: "id = ?", values: ["1"]}}),
        _cinemas: useQuery(api.cinemas),
        _movies: useQuery(api.movies),
        _timeslots: useQuery(api.timeslots),

        // Mutations
        // Cinema
        _createCinema: useMutation(api.createCinema),
        _destroyCinema: useMutation(api.destroyCinema),

        // Movie
        _createMovie: useMutation(api.createMovie),
        _destroyMovie: useMutation(api.destroyMovie),

        // Timeslot
        _createTimeslot: useMutation(api.createTimeslot),
        _destroyTimeslot: useMutation(api.destroyTimeslot)
    }},
    getters: {
        route(state) {
            return useRoute();
        },
        router(state) {
            return useRouter();
        },

        signedIn(state) {
            return state._signedIn.result?.users.result[0] ?? null;
        },
        cinemas(state) {
            return state._cinemas.result?.cinemas.result ?? [];
        },
        movies(state) {
            return state._movies.result?.movies.result ?? [];
        },
        timeslots(state) {
            return state._timeslots.result?.timeslots.result ?? [];
        }
    },
    actions: {
        setMessages(...messages) {
            this.$state.messages.length = 0;
            this.$state.messages.push(...messages);
        },

        mutate(mutation, variables, onDone=null) {
            if(onDone) mutation.onDone(onDone);
            return mutation.mutate(variables);
        },

        createCinema(variables, onDone=null) {
            this.mutate(this.$state._createCinema, {
                name: variables.name,
                location: variables.location,
                seats: variables.seats,
            }, onDone);
        },
        destroyCinema(variables, onDone=null) {
            this.mutate(this.$state._destroyCinema, {
                condition: variables.condition,
                values: variables.values ?? []
            }, onDone);
        },

        createMovie(variables, onDone=null) {
            this.mutate(this.$state._createMovie, {
                title: variables.title,
                description: variables.description,
            }, onDone);
        },
        destroyMovie(variables, onDone=null) {
            this.mutate(this.$state._destroyMovie, {
                condition: variables.condition,
                values: variables.values ?? []
            }, onDone);
        },

        createTimeslot(variables, onDone=null) {
            this.mutate(this.$state._createTimeslot, {
                time: variables.time,
                label: variables.label,
            }, onDone);
        },
        destroyTimeslot(variables, onDone=null) {
            this.mutate(this.$state._destroyTimeslot, {
                condition: variables.condition,
                values: variables.values ?? []
            }, onDone);
        },
    },
});