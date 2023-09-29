/* global FastBoot */
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  async model() {
    if (typeof FastBoot !== 'undefined') {
      const fs = FastBoot.require('fs');
      return fs.readFileSync(`${FastBoot.distPath}/example.md`, 'utf-8');
    }

    const result = await fetch('/example.md');
    return result.text();
  }
}
