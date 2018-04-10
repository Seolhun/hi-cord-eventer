import Element from './element/Element';
import BaseComponent from './component/BaseComponent';

class BannerComponent extends BaseComponent {
  constructor({ banner, infinity }) {
    super({ banner, infinity });
  }

  view() {
    const todoInputForm = new Element({
      tag: 'form',
      children: {
        formInput: new Element({
          tag: 'input',
          attributes: {
            type: 'text',
            name: 'todoInput',
          },
        }),
        formSubmitBtn: new Element({
          tag: 'button',
          attributes: {
            type: 'submit',
            className: 'submitBtn',
            textContent: 'add',
          },
          on: {
            event: 'click',
            function(event) {
              event.preventDefault();
              console.log('event is ran');
            },
          },
        }),
      },
    });
    app.appendChild(todoInputForm.create());
  }
}


const app = document.getElementById('app');
const Banner = new BannerComponent(new BaseComponentModel({ banner: { image: '', link: '' }, infinity: true }));
Banner.view();
