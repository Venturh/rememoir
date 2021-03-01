import dayjs from 'dayjs'

export function timeFromDate(date: string) {
  return dayjs(parseInt(date)).fromNow(true)
}
export function calendarDate(value: string) {
  return dayjs(parseInt(value)).calendar()
}

export function updateDateLocales(locale: string) {
  switch (locale) {
    case 'de':
      dayjs.updateLocale('de', {
        calendar: {
          lastDay: '[Gestern, ] DD.MM.YYYY',
          sameDay: '[Heute, ] DD.MM.YYYY',
          nextDay: '[Morgen, ] DD.MM.YYYY',
          lastWeek: 'dddd, DD.MM.YYYY ',
          sameElse: 'dddd, DD.MM.YYYY',
          nextWeek: 'dddd, DD.MM.YYYY',
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
      break
    case 'en':
      dayjs.updateLocale('en', {
        calendar: {
          lastDay: '[Yesterday, ] DD.MM.YYYY',
          sameDay: '[Today, ] DD.MM.YYYY',
          nextDay: '[Tomorrow, ] DD.MM.YYYY',
          lastWeek: 'dddd, DD.MM.YYYY ',
          sameElse: 'dddd, DD.MM.YYYY',
          nextWeek: 'dddd, DD.MM.YYYY',
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

    default:
      break
  }
}
