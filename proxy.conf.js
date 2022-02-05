const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'https://localhost:3001/',
        secure: false,
        pathRewrite: { '^/api': ''}
    }
]

module.exports = PROXY_CONFIG;