import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const toDate = timestamp => {
	return dayjs().to(timestamp);
};
