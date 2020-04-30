require('./ListenerService')

class SendResourceService extends ListenerService{
    origin
    destination
    resources = []
    templateAction = []
    __construct({priority, type, dependencies, activate, origin, destination, resources}){
        super({priority, type, dependencies, action, activate})
        this.origin = origin
        this.destination = destination
        this.resources = resources
        this.templateAction = [
            {
              "name": "action",
              "value": "transportOperations"
            },
            {
              "name": "function",
              "value": "loadTransportersWithFreight"
            },
            {
              "name": "destinationCityId",
              "value": "1898"
            },
            {
              "name": "islandId",
              "value": "46"
            },
            {
              "name": "oldView",
              "value": ""
            },
            {
              "name": "position",
              "value": ""
            },
            {
              "name": "avatar2Name",
              "value": ""
            },
            {
              "name": "city2Name",
              "value": ""
            },
            {
              "name": "type",
              "value": ""
            },
            {
              "name": "activeTab",
              "value": ""
            },
            {
              "name": "transportDisplayPrice",
              "value": "0"
            },
            {
              "name": "premiumTransporter",
              "value": "0"
            },
            {
              "name": "minusPlusValue",
              "value": "500"
            },
            {
              "name": "cargo_resource",
              "value": "124"
            },
            {
              "name": "cargo_tradegood1",
              "value": "28"
            },
            {
              "name": "cargo_tradegood2",
              "value": "81"
            },
            {
              "name": "cargo_tradegood3",
              "value": "20"
            },
            {
              "name": "cargo_tradegood4",
              "value": "0"
            },
            {
              "name": "jetPropulsion",
              "value": "0"
            },
            {
              "name": "transporters",
              "value": "1"
            },
            {
              "name": "backgroundView",
              "value": "island"
            },
            {
              "name": "currentIslandId",
              "value": "46"
            },
            {
              "name": "templateView",
              "value": "transport"
            },
            {
              "name": "ajax",
              "value": "1"
            }
          ]
    }
}

export default SendResourceService