const Endpoint = require('cubic-api/endpoint')

/**
 * Provides a list of available servers
 */
class Servers extends Endpoint {
  constructor (options) {
    super(options)
    this.schema.description = 'Get a list of all servers, grouped by regions. This is deprecated and will be removed in the next version.'
    this.schema.url = '/wow-classic/v1/servers'
    this.schema.request = { url: '/wow-classic/v1/servers' }
    this.schema.response = {
      EU: [String],
      US: [String]
    }
  }

  /**
   * Main method which is called by EndpointHandler on request
   */
  async main (req, res) {
    const servers = await this.db.collection('server').find().toArray()
    servers.sort((a, b) => a.name.localeCompare(b.name))

    // Group servers by region and omit faction
    const groupedServers = {}
    for (const server of servers) {
      if (server.faction === 'Horde') continue // Skip to prevent duplicated servers
      if (!groupedServers[server.region]) groupedServers[server.region] = []

      const nameWithoutFaction = server.name.split('-')
      nameWithoutFaction.pop()
      groupedServers[server.region].push(nameWithoutFaction.join('-'))
    }

    this.cache(groupedServers, 60 * 60)
    res.send(groupedServers)
  }
}

module.exports = Servers
