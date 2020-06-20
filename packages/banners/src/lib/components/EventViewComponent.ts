interface EventViewComponentProps {
  target: string;
}

abstract class EventViewComponent {
  target: string;

  constructor(props: EventViewComponentProps) {
    this.target = props.target;
  }

  render() {
    return this.target;
  }
}

export {
  EventViewComponentProps,
  EventViewComponent
};
export default EventViewComponent;
