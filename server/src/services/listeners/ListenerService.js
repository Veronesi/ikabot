require('../Service')

class ListenerService extends Service {
    dependencies = []
    action
    activate = []
    __construct({priority, type, dependencies, action, activate}){
        super({priority, type})
        this.dependencies = dependencies
        this.action = action
        this.activate = activate
    }
}

export default ListenerService;