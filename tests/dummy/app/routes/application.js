import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    const result = await fetch('/example.md');
    return result.text();
  }
}
