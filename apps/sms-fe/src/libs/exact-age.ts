import { intervalToDuration, parse } from 'date-fns';

const exactAge = (birth: Date) => {
  console.log(birth);
  const { years, months, days } = intervalToDuration({
    start: birth,
    end: new Date(),
  });
  return { years, months, days };
};

export default exactAge;
