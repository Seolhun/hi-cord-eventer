import classnames from 'classnames';

export default class Element {
  constructor({ tag, attributes, children, on }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.on = on;
  }

  render() {
    // Tag
    if (!this.tag || typeof this.tag !== 'string') {
      throw new Error('Requirement tag param in Element.js');
    }
    const created_element = document.createElement(this.tag);

    // Attributes
    if(this.attributes && typeof this.attributes !== 'object') {
      throw new Error('The Element attributes have to be object type');
    }
    if (this.attributes) {
      for (let i in this.attributes) {
        if(i === 'className') {
          created_element[i] = classnames(this.attributes[i]);
        } else {
          created_element[i] = this.attributes[i];
        }
      }
    }

    // Children
    if(this.children && !Array.isArray(this.children)) {
      throw new Error('The Element children have to be Array type');
    }
    if (this.children) {
      for (let child of this.children) {
        if(!child instanceof Element) {
          throw new Error('The Element children have to be build by Element.js');
        }
        created_element.appendChild(child.render())
      }
    }

    // On(Event)
    if (this.on && typeof this.on.event !== 'string') {
      if (this.on.event && typeof this.on.event !== 'string') {
        throw new Error('The Element on.event have to be string type');
      }
      if (this.on.function && typeof this.on.function !== 'function') {
        throw new Error('The Element on.function have to be function type');
      }
    }

    if (this.on) {
      created_element.addEventListener(this.on.event, this.on.function)
    }
    return created_element
  }
}
