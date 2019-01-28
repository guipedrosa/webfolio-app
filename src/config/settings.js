export const settings = {
    restApi: function() {
        if (process.env.NODE_ENV == 'production'){
            return 'https://webfolio-backend.herokuapp.com/api'
        } else {
            return 'http://localhost:3000/api'
        }
    }
}