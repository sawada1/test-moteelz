import { addDays, addMonths, format } from 'date-fns'
export const useDateUtilities = () => {
  const errorInputDate = ref(false)
  const masks = ref({
    modelValue: 'YYYY-MM-DD'
  })
  const dayNamesAR = ref([
    'الاثنين',
    'الثلاثاء',
    'الاربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
    'الأحد'
  ])
  const dayNamesEN = ref(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'])

  const formatDate = (date: Date) => format(date, 'yyyy/MM/dd')

  const tomorow = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today

  }
  const differenceInMonths = (d1: Date, d2: Date) => {
    var months
    months = (d2.getFullYear() - d1.getFullYear()) * 12
    months -= d1.getMonth()
    months += d2.getMonth()
    return months <= 0 ? 1 : months + 1
  }

  function differenceInDays(date1: number | Date, date2: number | Date) {
    const ONE_DAY = 1000 * 60 * 60 * 24

    const differenceMs = Math.abs(date2 - date1)

    return Math.floor(differenceMs / ONE_DAY)
  }

  const today = () => {
    var today = new Date()
    return today
  }

  // change 14 day constrain
  const datAfter14Days = (fromDate: any) => {
    var day = new Date()
    // day.setDate(day.getDate() + 1)
     day.setDate(day.getDate() + 14)
    if (fromDate) {
      var fromDateDay = new Date(fromDate)
      fromDateDay.setDate(fromDateDay.getDate() + 1)
      // fromDateDay.setDate(fromDateDay.getDate() + 14)
      return fromDateDay
    }
    return day
  }
  const dayAfterMonth = () => {
    var today = new Date()

    return new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
  }
  const isDateAfterToday = (timestamp: number): boolean => {
    const todayTimestamp = Date.now()

    return timestamp > todayTimestamp
  }

  const parseFilterDate = (dateString: string, defaultDate: string) => {
    const timestamp = dateString != '' ? Date.parse(dateString) : NaN
    const date = isNaN(timestamp) ? Date.parse(defaultDate) : timestamp

    return isDateAfterToday(date) ? new Date(date) : new Date(defaultDate)
  }
  const isValidDate = (date: Date) => {
    return date instanceof Date && !isNaN(date.getTime())
  }

  const generateFakeToken = (length = 16) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

  return {
    masks,
    datAfter14Days,
    errorInputDate,
    dayNamesAR,
    dayNamesEN,
    formatDate,
    differenceInDays,
    differenceInMonths,
    tomorow,
    isDateAfterToday,
    today,
    dayAfterMonth,
    parseFilterDate,
    isValidDate,
    generateFakeToken
  }
}
