import { createRouter } from '../../libs/router';

const user = createRouter().query('me', {
  resolve() {
    return { message: 'User Me Route' };
  },
});

export default user;
