import moment from 'moment';

export function generateCalendarDays(startDay, endDay) {
  const calendarDays = [];

  const day = startDay.clone().subtract(1, 'day');
  while (day.isBefore(endDay, 'day')) {
    calendarDays.push(
      Array(7).fill('dayOfTheWeek').map(() => day.add(1, 'day').clone())
    );
  }

  return calendarDays;
}

export function getStartEndDay(currMonth) {
  return {
    startDay: currMonth.clone().startOf('month').startOf('week'),
    endDay: currMonth.clone().endOf('month').endOf('week')
  };
}

export function generateWeeklyCalendarDays(startDay, endDay) {

  const day = startDay.clone().subtract(1, 'day');
  const calendarDays = Array(7).fill('dayOfTheWeek').map(() => day.add(1, 'day').clone());

  return calendarDays;
}

export function getStartEndWeekDay(selectedDay) {
  return {
    startDay: moment(selectedDay).clone().startOf('week'),
    endDay: moment(selectedDay).clone().endOf('week')
  };
}

export function isToday(day) {
  return moment(new Date()).isSame(day, 'day');
}

export function isSelected(selectedDay, day) {
  return moment(selectedDay).isSame(day, 'day');
}

export function isNotCurrMonthNums(day, currMonth) {
  const firstDay = currMonth.clone().startOf('month');
  const lastDay = currMonth.clone().endOf('month');
  return !moment(day).isBetween(firstDay - 1, lastDay + 1);
}

export function dayStyle({ day, currMonth, byDate }) {
  if (isToday(day)) return 'today';
  if (hasDateScheduled(day, byDate)) {
    return styleCaldendarDate(day, byDate);
  }
  if (isNotCurrMonthNums(day, currMonth)) return 'extra-days';
  return '';
}

export function weeklyViewDayStyle({ day, currMonth, byDate, selectedDay }) {
  if (isToday(day)) return 'today';
  if (isSelected(selectedDay, day)) return 'selected-day';
  if (isNotCurrMonthNums(day, currMonth)) return 'extra-days';
  return '';
}

export function hasDateScheduled(day, byDate) {
  return byDate[day.format('M D YYYY')];
}

function styleCaldendarDate(day, byDate) {
  const activity = byDate[day.format('M D YYYY')][0].activity;
  const dayStyle = 'scheduled-date ';

  return dayStyle + checkActivity(activity);
}

export function styleDailyScheduleActivity(activity) {
  const activityStyle = 'scheduled-activity ';
  return activityStyle + checkActivity(activity);
}

function checkActivity(activity) {
  const activityLowerCase = activity.toLowerCase();
  switch (activityLowerCase) {
    case 'eating':
      return 'eating-bubble';
    case 'hiking':
      return 'hiking-bubble';
    case 'picnic':
      return 'picnic-bubble';
    case 'movies':
      return 'movies-bubble';
    case 'shopping':
      return 'shopping-bubble';
    case 'spa day':
      return 'spa-bubble';
    case 'bowling':
      return 'bowling-bubble';
    case 'other':
      return 'other-bubble';
  }
}

export function hasFutureDates(byDate) {
  const days = Object.keys(byDate);
  return days.some(day => {
    const currDate = moment(day);
    const isAfter = currDate.isAfter(moment());
    return isAfter;
  });
}

export function getFutureDates(byDate) {
  const days = Object.keys(byDate);
  const futureDates = [];
  days.forEach(day => {
    if (moment(day).isAfter(moment())) {
      futureDates.push(byDate[day]);
    }
  });
  const flatArr = futureDates.flat();
  const sortedDates = sortFutureDates(flatArr);
  return sortedDates;
}

function sortFutureDates(dates) {
  return dates.sort((a, b) => {
    return moment(a.day) - moment(b.day);
  });
}

export const activityIcons = {
  eating: 'fas fa-utensils activity-icon dark-icon',
  shopping: 'fas fa-shopping-bag activity-icon',
  hiking: 'fas fa-leaf activity-icon',
  bowling: 'fas fa-bowling-ball activity-icon',
  picnic: 'fas fa-tree activity-icon',
  movies: 'fas fa-ticket-alt activity-icon',
  spa: 'fas fa-heart activity-icon',
  other: 'fas fa-ellipsis-h activity-icon'
};
