export default class DateFormatter {
  public format(date: Date): string {
    const year = date.getFullYear();
    const month = date.getUTCMonth() + 1
    const day = date.getUTCDate();
    return `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day}`;
  }
}
