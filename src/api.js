export default class Api {
  constructor(url) {
    this._url = url;
  }

  async init(formData) {
    try {
      const response = await fetch(this._url, {
        method: 'POST',
        body: formData
      });

      console.log(response.status)

      if (response.status >= 200 && response.status < 300) {
        alert('Данные успешно загружены');
        return response;
      }

      alert(`Ошибка ${response.status}`);

    } catch {
      alert('Прозошла ошибка, попробуйте позже');
    }
  }
}
