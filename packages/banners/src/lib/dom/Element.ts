interface ElementProps<K extends keyof HTMLElementTagNameMap> {
  tag: K;

  attributes?: Partial<HTMLElementTagNameMap[K]>;

  childrens?: Element<K>[];
}

export class Element<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K];

  private childrens?: Element<K>[];

  constructor(props: ElementProps<K>) {
    const { tag, attributes, childrens } = props;
    this.element = this.buildElement(tag, attributes);
    this.childrens = childrens;
  }

  private buildElement = (tag: K, attributes?: Partial<HTMLElementTagNameMap[K]>) => {
    this.element = document.createElement(tag);
    if (attributes) {
      Object.assign(this.element, {
        ...attributes,
      });
    }
    return this.element;
  };

  render() {
    if (Array.isArray(this.childrens)) {
      this.childrens.forEach((children) => {
        this.element.appendChild(children.render());
      });
    }
    return this.element;
  }
}

export default Element;
