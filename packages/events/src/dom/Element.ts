interface ElementProps<K> {
  tag: K;

  attributes?: Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>;

  style?: Partial<CSSStyleDeclaration>;

  childrens?: Element<keyof HTMLElementTagNameMap | any>[];
}

export class Element<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K];

  constructor(props: ElementProps<K>) {
    this.element = this.render(props);
  }

  render(props: ElementProps<K>) {
    const { tag, attributes, style, childrens } = props;
    this.element = document.createElement(tag);

    if (attributes) {
      Object.assign(this.element, attributes);
    }
    if (style) {
      Object.assign(this.element.style, style);
    }
    if (Array.isArray(childrens)) {
      childrens.forEach((children) => {
        this.element.appendChild(children.element);
      });
    }
    return this.element;
  }
}

export default Element;
