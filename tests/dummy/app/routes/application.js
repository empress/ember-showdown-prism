import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class ApplicationRoute extends Route {
  async model() {
    const result = await fetch('/example.md');
    return result.text();
  }
}
