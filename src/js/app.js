import Navigo from 'navigo';
import Handlebars from 'handlebars';

const VIEW_ELEMENT_ID = 'view';
const VIEW_ELEMENT = document.getElementById(VIEW_ELEMENT_ID);

class App {
  /**
   * Class constructor.
   */
  constructor() {
    this.init();
  }

  /**
   * Performs application initialization tasks.
   */
  async init() {
    await this.configureRouter();
  }

  /**
   * Configures the Navigo router.
   * @see https://github.com/krasimir/navigo
   */
  async configureRouter() {
    const router = new Navigo(null, true, '#');
    router.on({
      'sampleroute': () => {
        const templateData = {
          name: 'World',
        };

        this.loadHTML('./templates/default.html', templateData);
      },
    });

    // Sets the default route.
    router.on(() => {
      router.navigate('/sampleroute');
    });

    // Set the 404 route
    router.notFound((query) => {
      $id('view').innerHTML =
        '<h3>Sorry, that page doesn\'t exist.</h3>';
    });

    router.resolve();
  }

  /**
   * Asynchronously fetches the html template from the supplied path then sets
   * the contents of the element with the passed id to the loaded html.
   * @param {string} url Url of template element to load.
   * @param {*} templateData Data to pass into template.
   */
  async loadHTML(url, templateData = null) {
    const templateRequest = await fetch(url);
    const uncompiledTemplate = await templateRequest.text();
    const template = Handlebars.compile(uncompiledTemplate);
    const renderedTemplate =
      await template(templateData);
    VIEW_ELEMENT.innerHTML = renderedTemplate;
  }
}

new App();
