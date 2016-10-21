import axios from 'axios';

const FortuneCookie = {
  async getOne() {
    const response = await axios.get('http://fortunecookieapi.com/v1/cookie');
    return response.data[0].fortune.message;
  },
};

export { FortuneCookie };
