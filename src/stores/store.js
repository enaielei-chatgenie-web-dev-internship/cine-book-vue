import { defineStore } from "pinia";

import {computed, reactive} from 'vue';
import {useQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineStore({
  id: "store",
  state() {return {
    userId: 0,
    queryUser: useQuery(gql`
      query query($id: String!) {
        users(filter: {
          condition: "id = ?",
          values: [$id]
        }) {
          result {
            id, fullName, bookings {
              id, seat, showing {
                id,
                cinema {id, name},
                movie {id, title},
                timeslot {id, time: prettyTime}
              } 
            },
            admin
          }
        }
      }
    `, {id: "1"})
  }},
  getters: {
    signedIn(state) {
      return state.queryUser.result?.users.result[0] ?? null;
    }
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});


// import {computed, reactive} from 'vue';
// import {useQuery} from '@vue/apollo-composable';
// import gql from 'graphql-tag';

// const vars = reactive({
//   id: "1"
// });
// const {result: queryUser} = useQuery(gql`
//   query($id: String!) {
//     users(filter: {
//       condition: "id = ?",
//       values: [$id]
//     }) {
//       result {
//         id, fullName, bookings {
//           id, seat, showing {
//             id,
//             cinema {id, name},
//             movie {id, title},
//             timeslot {id, time: prettyTime}
//           } 
//         }
//       }
//     }
//   }
// `, vars);

// const user = computed(() => queryUser.value?.users.result[0] ?? null);