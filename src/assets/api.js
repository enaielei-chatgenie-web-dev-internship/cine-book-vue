import gql from 'graphql-tag';

// Fragments
const userFragment = gql`
    fragment User on User {
        id, fullName, email, mobileNumber, admin
    }
`;

const cinemaFragment = gql`
    fragment Cinema on Cinema {
        id, name, location, seats
    }
`;

const movieFragment = gql`
    fragment Movie on Movie {
        id, title, description
    }
`;

const timeslotFragment = gql`
    fragment Timeslot on Timeslot {
        id, time: prettyTime, label
    }
`;

const showingFragment = gql`
    ${cinemaFragment}
    ${movieFragment}
    ${timeslotFragment}

    fragment Showing on Showing {
        id
        cinema {...Cinema}
        movie {...Movie}
        timeslot {...Timeslot}
    }
`;

const bookingFragment = gql`
    ${userFragment}
    ${showingFragment}

    fragment Booking on Booking {
        id
        showing {...Showing}
        user {...User}
        seat
    }
`;

// Queries
const users = gql`
    ${userFragment}

    query users($filter: FilterInputObject, $order: [OrderInputObject!], $page: PageInputObject) {
        users(filter: $filter, order: $order, page: $page) {
            result {...User}
        }
    }
`;

const cinemas = gql`
    ${cinemaFragment}

    query cinemas($filter: FilterInputObject, $order: [OrderInputObject!], $page: PageInputObject) {
        cinemas(filter: $filter, order: $order, page: $page) {
            result {...Cinema}
        }
    }
`;

const movies = gql`
    ${movieFragment}

    query movies($filter: FilterInputObject, $order: [OrderInputObject!], $page: PageInputObject) {
        movies(filter: $filter, order: $order, page: $page) {
            result {...Movie}
        }
    }
`;

const timeslots = gql`
    ${timeslotFragment}

    query timeslots($filter: FilterInputObject, $order: [OrderInputObject!], $page: PageInputObject) {
        timeslots(filter: $filter, order: $order, page: $page) {
            result {...Timeslot}
        }
    }
`;

const showings = gql`
    ${showingFragment}

    query showings($filter: FilterInputObject, $order: [OrderInputObject!], $page: PageInputObject) {
        showings(filter: $filter, order: $order, page: $page) {
            result {...Showing}
        }
    }
`;

const bookings = gql`
    ${bookingFragment}

    query bookings($filter: FilterInputObject, $order: [OrderInputObject!], $page: PageInputObject) {
        bookings(filter: $filter, order: $order, page: $page) {
            result {...Booking}
        }
    }
`;

// Mutations
const createCinema = gql`
    ${cinemaFragment}

    mutation createCinema($name: String!, $location: String!, $seats: Int!) {
        createCinema(input: {
            name: $name, location: $location, seats: $seats
        }) {
            result {...Cinema}
            messages
        }
    }
`;

const destroyCinema = gql`
    ${cinemaFragment}

    mutation destroyCinema($condition: String!, $values: [String!]) {
        destroyCinema(input: {
            condition: $condition, values: $values
        }) {
            result {...Cinema}
            messages
        }
    }
`;

const createMovie = gql`
    mutation createMovie($title: String!, $description: String) {
        createMovie(input: {
            title: $title, description: $description
        }) {
            result {id, title, description}
            messages
        }
    }
`;

const destroyMovie = gql`
    ${movieFragment}

    mutation destroyMovie($condition: String!, $values: [String!]) {
        destroyMovie(input: {
            condition: $condition, values: $values
        }) {
            result {...Movie}
            messages
        }
    }
`;

const createTimeslot = gql`
    mutation createTimeslot($time: ISO8601DateTime!, $label: String) {
        createTimeslot(input: {
            time: $time, label: $label
        }) {
            result {id, time: prettyTime, label}
            messages
        }
    }
`;

const destroyTimeslot = gql`
    ${timeslotFragment}

    mutation destroyTimeslot($condition: String!, $values: [String!]) {
        destroyTimeslot(input: {
            condition: $condition, values: $values
        }) {
            result {...Timeslot}
            messages
        }
    }
`;

const createShowing = gql`
    mutation createShowing($cinemaId: Int!, $movieId: Int!, $timeslotId: Int!) {
        createShowing(input: {
            cinemaId: $cinemaId, movieId: $movieId, timeslotId: $timeslotId
        }) {
            result {
                id
                cinema {id, name, location, seats}
                movie {id, title, description}
                timeslot {id, time: prettyTime, label}
            }
            messages
        }
    }
`;

const destroyShowing = gql`
    ${showingFragment}

    mutation destroyShowing($condition: String!, $values: [String!]) {
        destroyShowing(input: {
            condition: $condition, values: $values
        }) {
            result {...Showing}
            messages
        }
    }
`;

const createBooking = gql`
    mutation createBooking($showingId: Int!, $userId: Int!, $seat: Int!) {
        createBooking(input: {
            showingId: $showingId, userId: $userId, seat: $seat
        }) {
            result {
                id
                showing {
                    id
                    cinema {id, name, location, seats}
                    movie {id, title, description}
                    timeslot {id, time: prettyTime, label}
                }
                user {id, fullName, email, mobileNumber, admin}
                seat,
            }
            messages
        }
    }
`;

const destroyBooking = gql`
    ${bookingFragment}

    mutation destroyBooking($condition: String!, $values: [String!]) {
        destroyBooking(input: {
            condition: $condition, values: $values
        }) {
            result {...Booking}
            messages
        }
    }
`;

export default {
    // Queries
    users,
    cinemas,
    movies,
    timeslots,
    showings,
    bookings,

    // Mutations
    createCinema,
    destroyCinema,

    createMovie,
    destroyMovie,

    createTimeslot,
    destroyTimeslot,

    createShowing,
    destroyShowing,

    createBooking,
    destroyBooking
};