/**
 * Dev-only service that listens to orders sent to the real API, just to have
 * some sample data when developing.
 */
async function monitor () {
  const endpoints = cubic.nodes.api.server.ws.endpoints
  const db = (await endpoints.db).db(endpoints.config.mongoDb)
  const options = { db, cache: endpoints.cache, ws: endpoints.ws }
  const Order = require('../../api/warframe/v1/orders/new.js')
  const order = new Order({ ...options, ...{ url: '/warframe/v1/orders' } })
  const Client = require('cubic-client')
  const client = new Client({
    api_url: 'wss://api.nexushub.co/ws',
    auth_url: 'wss://auth.nexushub.co/ws'
  })

  // Track orders from production API and post them locally. This includes wfm
  // orders.
  client.subscribe('/warframe/v1/orders', req => {
    const res = { send () {} }
    order.main({ body: req }, res)
  })
}
monitor()
