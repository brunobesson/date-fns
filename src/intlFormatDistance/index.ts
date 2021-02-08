import requiredArgs from '../_lib/requiredArgs/index'
import defaultLocale from '../locale/en-US/index'
import differenceInSeconds from '../differenceInSeconds/index'
import differenceInMinutes from '../differenceInMinutes/index'
import differenceInHours from '../differenceInHours/index'
import differenceInDays from '../differenceInDays/index'
import differenceInWeeks from '../differenceInWeeks/index'
import differenceInMonths from '../differenceInMonths/index'
import differenceInQuarters from '../differenceInQuarters/index'
import differenceInYears from '../differenceInYears/index'
import { yearInDays } from '../constants/index'
import { Unit } from '../types'

/**
 * @name intlFormatDistance
 * @category Common Helpers
 * @summary Enables language-sensitive relative time formatting according to the locale and formatting options
 * of the given Intl.RelativeTimeFormat object.
 * @description
 * The API gets a difference between two gived dates and either picks the most appropriate unit
 * depending on the distance (the less the distance the smaller the unit),
 * or allowes a user to pass in a unit as well.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 1 second                                                          | in 1 seconds        |
 * | n seconds                                                         | in n seconds        |
 * | 1 m                                                               | in 1 minute         |
 * | 1 m                                                               | in 60 seconds       |
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with.
 * @param {Object} [options] - an object with options.
 * @param {String} [options.unit] - formats the distance with the given unit ('year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second').
 * @param {String|String[]} [options.locale] - the locale to use (BCP 47 language tag). [For the reference see MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation).
 * @param {String} [options.localeMatcher='best fit'] - the locale matching algorithm to use. Other value: "lookup".
 * @param {String} [options.numeric='always'] - the output message format. Other value: "auto".
 * @param {String} [options.style='long'] - the length of the internationalized message. Other values: "short" or "narrow";
 *
 * @example
 * // What is the distance between Apr, 4 1986 11:30:00 and Apr, 4 1986 10:30:00 in Intl?
 * const result = intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0));
 * // => in 1 hour
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0));
 * // => in 1 year
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in quarters in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter'});
 * // => in 4 quarters
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in months in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'month'});
 * // => in 12 months
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in weeks in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'week'});
 * // => in 52 weeks
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in days in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'day'});
 * // => in 365 days
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in hours in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'hour'});
 * // => in 8,760 hours
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in minutes in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'minute'});
 * // => in 525,600 minutes
 *
 * @example
 * What is the distance between Apr, 4 1987 10:30:00 and Apr, 4 1986 10:30:00 in seconds in Intl?
 * const result = intlFormatDistance(
 *   new Date(1987, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'second'});
 * // in 31,536,000 seconds
 *
 * @example
 * // What is the distance between Apr, 4 1986 11:30:00 and Apr, 4 1986 10:30:00 in minutes in Spanish in Intl?
 * const result = intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'minute', locales: 'es' });
 * // => dentro de 60 minutos
 *
 * @example
 * // What is the distance between Apr, 4 1986 11:30:00 and Apr, 4 1986 10:30:00 in minutes in German in Intl?
 * const result = intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'minute', locales: 'de' });
 * // => in 60 Minuten
 *
 * | Other Options     | Possible values         |  Result            |
 * |-------------------|-------------------------|--------------------|
 * | localeMatcher     | 'lookup' and 'best fit' | N/A                |
 * |                   |                         |                    |
 * | numeric           | 'always'                | 1 day ago          |
 * |                   | 'auto'                  | yesterday          |
 * |                   |                         |                    |
 * | style             | 'long'                  | in 1 month         |
 * |                   | 'short'                 | in 1 mo.           |
 * |                   | 'narrow'                | in 1 mo.           |
 *
 */

interface Options {
  unit?: Unit
  locale?: Intl.RelativeTimeFormatStyle
  localeMatcher?: Intl.RelativeTimeFormatLocaleMatcher
  numeric?: Intl.RelativeTimeFormatNumeric
  style?: Intl.RelativeTimeFormatStyle
}

export default function intlFormatDistance(
  date: Date | number,
  baseDate: Date | number,
  options?: Options
): String {
  requiredArgs(2, arguments)

  let value
  let unit

  let secondsInMinute = 60
  let secondsInHour = 60 * secondsInMinute
  let secondsInDay = secondsInHour * 24
  let secondsInWeek = secondsInDay * 7
  let secondsInYear = secondsInDay * yearInDays
  let secondsInMonth = secondsInYear / 12
  let secondsInQuarter = secondsInMonth * 3

  if (!options?.unit) {
    // Get the unit based on diffInSeconds calculations if no unit passed in
    const diffInSeconds = differenceInSeconds(date, baseDate) // The smallest unit

    if (Math.abs(diffInSeconds) < secondsInMinute) {
      value = differenceInSeconds(date, baseDate)
      unit = 'second'
    } else if (Math.abs(diffInSeconds) < secondsInHour) {
      value = differenceInMinutes(date, baseDate)
      unit = 'minute'
    } else if (Math.abs(diffInSeconds) < secondsInDay) {
      value = differenceInHours(date, baseDate)
      unit = 'hour'
    } else if (Math.abs(diffInSeconds) < secondsInWeek) {
      value = differenceInDays(date, baseDate)
      unit = 'day'
    } else if (Math.abs(diffInSeconds) < secondsInMonth) {
      value = differenceInWeeks(date, baseDate)
      unit = 'week'
      console.log('222', value)
    } else if (Math.abs(diffInSeconds) < secondsInQuarter) {
      value = differenceInMonths(date, baseDate)
      unit = 'month'
    } else if (Math.abs(diffInSeconds) < secondsInYear) {
      if (differenceInQuarters(date, baseDate) < 4) {
        // To filter out cases that are less than a year but match 4 quarters
        value = differenceInQuarters(date, baseDate)
        unit = 'quarter'
      } else {
        value = differenceInYears(date, baseDate)
        unit = 'year'
      }
    } else {
      value = differenceInYears(date, baseDate)
      unit = 'year'
    }
  } else {
    // Get the value if unit has been passed in
    unit = options?.unit
    if (unit === 'second') {
      value = differenceInSeconds(date, baseDate)
    } else if (unit === 'minute') {
      value = differenceInMinutes(date, baseDate)
    } else if (unit === 'hour') {
      value = differenceInHours(date, baseDate)
    } else if (unit === 'day') {
      value = differenceInDays(date, baseDate)
    } else if (unit === 'week') {
      value = differenceInWeeks(date, baseDate)
    } else if (unit === 'month') {
      value = differenceInMonths(date, baseDate)
    } else if (unit === 'quarter') {
      value = differenceInQuarters(date, baseDate)
    } else if (unit === 'year') {
      value = differenceInYears(date, baseDate)
    }
  }

  const rtf = new Intl.RelativeTimeFormat(
    options?.locale || defaultLocale,
    {
      localeMatcher: options?.localeMatcher,
      numeric: options?.numeric,
      style: options?.style,
    } || {}
  )

  return rtf.format(value, unit)
}