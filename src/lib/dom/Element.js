import classnames from 'classnames';

import { TouchUtils } from '../utils';


export default class Element {
  constructor({ tag, attributes, children, on, touch }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.on = on;
    this.touch = touch;
  }

  render() {
    // Tag
    if (!this.tag || typeof this.tag !== 'string') {
      throw new Error('Requirement tag param in Element.js');
    }
    const created_element = document.createElement(this.tag);

    // Attributes
    if (this.attributes && typeof this.attributes !== 'object') {
      throw new Error('The Element attributes have to be object type');
    }
    if (this.attributes) {
      for (let i in this.attributes) {
        if (i === 'className') {
          created_element[i] = classnames(this.attributes[i]);
        } else {
          created_element[i] = this.attributes[i];
        }
      }
    }

    // Children
    if (this.children && !Array.isArray(this.children)) {
      throw new Error('The Element children have to be Array type');
    }
    if (this.children) {
      for (let child of this.children) {
        if (!child instanceof Element) {
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
      created_element.addEventListener(this.on.event, this.on.function);
    }

    // Touch(Event)
    if (this.touch && typeof this.touch.event !== 'string') {
      if (this.touch.event && typeof this.touch.event !== 'string') {
        throw new Error('The Element touch.event have to be string type');
      }
      if (this.touch.function && typeof this.touch.function !== 'function') {
        throw new Error('The Element touch.function have to be function type');
      }
    }
    if (this.touch) {
      const manager = TouchUtils.createdManager(created_element);
      if (this.touch.event === 'tap') {
        TouchUtils.createdTap(manager, 1, this.touch.function);
      }

      if (this.touch.event === 'double_tap') {
        TouchUtils.createdTap(manager, 2, this.touch.function);
      }

      if (this.touch.event === 'press') {
        TouchUtils.createdPress(manager, this.touch.function);
      }

      if (this.touch.event === 'swipe') {
        TouchUtils.createdHorizontalSwipe(manager, this.touch.function);
      }
    }

    return created_element
  }
}
