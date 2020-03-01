import Echo from 'laravel-echo'

process.client && (window.io = require('socket.io-client'))

export default ({ $auth }, inject) => process.client && inject('echo', new Echo({
  broadcaster: 'socket.io',
  host: `${window.location.hostname}:6001`,
  auth: {
    headers: {
      Authorization: $auth.getToken('local')
    }
  }
}))
