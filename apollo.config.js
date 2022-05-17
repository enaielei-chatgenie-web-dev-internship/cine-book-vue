require('dotenv').config();

// apollo.config.js
module.exports = {
    client: {
        service: {
            name: 'cine-book-vue',
            // URL to the GraphQL API
            url: process.env.API,
        },
        // Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
        ],
    },
}