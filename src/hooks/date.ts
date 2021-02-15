import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.updateLocale('en', {
  calendar: {
    lastDay: '[Yesterday, ] DD.MM.YYYY',
    sameDay: '[Today, ] DD.MM.YYYY',
    nextDay: '[Morgen, ] DD.MM.YYYY',
    lastWeek: 'dddd, DD.MM.YYYY ',
    sameElse: 'dddd, DD.MM.YYYY',
  },
  relativeTime: {
    future: '%s',
    past: '%s',
    s: 'now',
    m: '1 min',
    mm: '%d min',
    h: '1 h',
    hh: '%d hrs',
    d: '1 d',
    dd: '%d d',
    M: '1 m',
    MM: '%d m',
    y: '1 y',
    yy: '%d y',
  },
})
dayjs.updateLocale('de', {
  calendar: {
    lastDay: '[Gestern, ] DD.MM.YYYY',
    sameDay: '[Heute, ] DD.MM.YYYY',
    nextDay: '[Morgen, ] DD.MM.YYYY',
    lastWeek: 'dddd, DD.MM.YYYY ',
    sameElse: 'dddd, DD.MM.YYYY',
  },
  relativeTime: {
    future: '%s',
    past: '%s',
    s: 'gerade',
    m: '1 min',
    mm: '%d min',
    h: '1 std',
    hh: '%d std',
    d: '1 t',
    dd: '%d t',
    M: '1 m',
    MM: '%d m',
    y: '1 j',
    yy: '%d j',
  },
})

export function useTimeFromDate(date: string) {
  return dayjs(parseInt(date)).fromNow(true)
}
export function useCalendarDate(date: string) {
  return dayjs(parseInt(date)).calendar()
}
