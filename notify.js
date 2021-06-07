const axios = require('axios');
const qs = require('querystring');
const notify_url = 'https://notify-api.line.me/api/notify';

module.exports = (token) => {
  if (!token) {
    throw new Error('token is required');
  }

  return {
    notify: async (params) => {
      if (!params.message) {
        throw new Error('message is required');
      }

      const options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
      };

      await axios.post(`${notify_url}`, qs.stringify(params), options);
    },
  };
};