import { NotificationProps, showNotification } from '@mantine/notifications';
import { CheckCircleIcon } from '@heroicons/react/solid';

type CustomNotificationProps = Omit<NotificationProps, 'message'>;

const optionsSuccess: CustomNotificationProps = {
  autoClose: 3000,
  color: 'green',
  icon: <CheckCircleIcon />,
};

export const notifySuccess = (
  message: string,
  show: typeof showNotification,
) => {
  show({ message, ...optionsSuccess });
};
