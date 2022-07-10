import { intervalToDuration, parse } from 'date-fns';

const exactAge = (birth: Date) => {
  const { years, months, days } = intervalToDuration({
    start: birth,
    end: new Date(),
  });
  return { years, months, days };
};

export default exactAge;
