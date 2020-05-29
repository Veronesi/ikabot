class Ejx {
    constructor({ type = 'div', insertBefore = '', childrenPosition = 'before', children = '', parent = '', childs = [], props = [], render = false } = {}) {
        this.childs = childs
        this.type = type
        this.props = props
        this.children = children
        this.parent = parent
        this.parentDOM;
        this.childrenPosition = childrenPosition
        this.insertBefore = insertBefore

        if (render)
            this.render()
    }

    append(child) {
        this.childs = (child.type) ? [...this.childs, child] : [...this.childs, ...child]
    }

    render() {
        parent = this.parent ? document.querySelector(this.parent) : this.parentDOM;
        const el = document.createElement(this.type);

        this.props.forEach(prop => {
            el.setAttribute(prop.name, prop.value);
        })
        if (this.childrenPosition == 'before') {
            el.appendChild(document.createTextNode(this.children));

            this.insertBefore ? parent.insertBefore(el, document.querySelector(this.insertBefore)) : parent.appendChild(el);


            this.childs.forEach(child => {
                child.parentDOM = el
                child.render()
            })
        } else {
            this.insertBefore ? parent.insertBefore(el, document.querySelector(this.insertBefore)) : parent.appendChild(el);

            this.childs.forEach(child => {
                child.parentDOM = el
                child.render()
            })

            el.appendChild(document.createTextNode(this.children));
        }
    }
}