import classnames from "classnames";

import { TouchBuilderUtils } from "../utils";
import { ElementCallback } from "./ElementCallback";

export class Element {
  constructor({ tag, attributes, children, on, touch }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.on = new ElementCallback({ ...on });
    this.touch = new ElementCallback({ ...touch });
  }

  render() {
    // Tag
    if (!this.tag || typeof this.tag !== "string") {
      throw new Error("Requirement tag param in Element.js");
    }
    const created_element = document.createElement(this.tag);

    // Attributes
    if (this.attributes && typeof this.attributes !== "object") {
      throw new Error("The Element attributes have to be object type");
    }
    if (this.attributes) {
      for (let i in this.attributes) {
        if (i === "className") {
          created_element[i] = classnames(this.attributes[i]);
        } else {
          created_element[i] = this.attributes[i];
        }
      }
    }

    // Children
    if (this.children && !Array.isArray(this.children)) {
      throw new Error("The Element children have to be Array type");
    }
    if (this.children) {
      for (let child of this.children) {
        if (!child instanceof Element) {
          throw new Error(
            "The Element children have to be build by Element.js",
          );
        }
        created_element.appendChild(child.render());
      }
    }

    // On(Event)
    if (this.on && typeof this.on.eventName !== "string") {
      if (this.on.eventName && typeof this.on.eventName !== "string") {
        throw new Error("The Element on.eventName have to be string type");
      }
      if (this.on.callback && typeof this.on.callback !== "function") {
        throw new Error("The Element on.callback have to be function type");
      }
      if (this.on.capture && typeof this.on.capture !== "boolean") {
        throw new Error("The Element on.capture have to be boolean type");
      }
    }
    if (this.on) {
      created_element.addEventListener(
        this.on.eventName,
        this.on.callback,
        this.on.capture,
      );
    }

    // Touch(Event)
    if (this.touch && typeof this.touch.eventName !== "string") {
      if (this.touch.eventName && typeof this.touch.eventName !== "string") {
        throw new Error("The Element touch.event have to be string type");
      }
      if (this.touch.callback && typeof this.touch.callback !== "function") {
        throw new Error("The Element touch.callback have to be function type");
      }
    }
    if (this.touch) {
      const manager = TouchBuilderUtils.createdManager(created_element);
      if (this.touch.eventName === "tap") {
        TouchBuilderUtils.createdTap(manager, 1, this.touch.callback);
      }

      if (this.touch.eventName === "double_tap") {
        TouchBuilderUtils.createdTap(manager, 2, this.touch.callback);
      }

      if (this.touch.eventName === "press") {
        TouchBuilderUtils.createdPress(manager, this.touch.callback);
      }

      if (this.touch.eventName === "swipe") {
        TouchBuilderUtils.createdHorizontalSwipe(manager, this.touch.callback);
      }
    }

    return created_element;
  }
}

export default Element;
