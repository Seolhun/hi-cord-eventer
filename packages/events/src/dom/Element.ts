interface ElementProps<K> {
  tag: K;

  attributes?: Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>;

  childrens?: Element<keyof HTMLElementTagNameMap | any>[];
}

export class Element<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K];

  constructor(props: ElementProps<K>) {
    const { tag, attributes, childrens } = props;
    this.element = this.render(tag, attributes, childrens);
  }

  render(
    tag: K,
    attributes?: Partial<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>,
    childrens?: Element<keyof HTMLElementTagNameMap | any>[]
  ) {
    this.element = document.createElement(tag);
    if (attributes) {
      Object.assign(this.element, {
        ...attributes,
      });
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
