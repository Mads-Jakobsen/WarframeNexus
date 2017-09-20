const Endpoint = require(blitz.config[blitz.id].endpointParent)

/**
 * Contains multi-purpose functions for child-methods and provides default values
 */
class Index extends Endpoint {
  constructor(api, db, url) {
    super(api, db, url)
    this.schema.view = "templates/open-source.vue"
  }
}

module.exports = Index
