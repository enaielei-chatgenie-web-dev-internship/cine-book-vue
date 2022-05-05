// apollo.config.js
module.exports = {
    client: {
        service: {
            name: 'cine-book-vue',
            // URL to the GraphQL API
            url: 'http://127.0.0.1:3000/graphql',
        },
        // Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
        ],
    },
}