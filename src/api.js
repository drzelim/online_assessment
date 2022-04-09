export default class Api {
  constructor(url) {
    this._url = url;
  }

  async init(formData) {
    const response = await fetch(this._url, {
      method: 'POST',
      body: formData,
    });
    return response;
  }
}
