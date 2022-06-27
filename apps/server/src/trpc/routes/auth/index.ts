import { createRouter } from '../../libs/router';
import signin from './signin';

export const auth = createRouter().merge(signin);
