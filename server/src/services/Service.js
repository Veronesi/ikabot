class Service {
    id
    priority
    type
    create_at
    __construct({priority, type}){
        this.id = Math.random()
        this.priority = priority
        this.type = type
        this.create_at = Date.now()
    }
}

export default Service;