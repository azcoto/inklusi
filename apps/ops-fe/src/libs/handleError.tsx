import axios, { AxiosError } from 'axios';
import { NotificationProps, showNotification } from '@mantine/notifications';
import { XCircleIcon } from '@heroicons/react/solid';
import { AuthError } from '@api/errorHandler';

type CustomNotificationProps = Omit<NotificationProps, 'message'>;

const options: CustomNotificationProps = {
  autoClose: 3000,
  color: 'red',
  icon: <XCircleIcon />,
};

const errorDef = [
  {
    constructor: AxiosError,
    list: [
      {
        name: 'Network Error',
        message: 'Network Error',
      },
      {
        name: 'USER_NOT_FOUND',
        message: 'User Tidak Ditemukan',
      },
    ],
  },
];
export const handleError = (error: unknown, show: typeof showNotification) => {
  if (axios.isAxiosError(error) && error.code === 'ERR_BAD_REQUEST') {
    const e = error as AxiosError<AuthError>;
    const list = errorDef.find((o) => o.constructor === e.constructor)?.list;
    if (list) {
      const err = list.find((o) => o.name === e.response?.data.name);
      show({ message: err?.message, ...options });
    }
  }
};
