export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp).toLocaleDateString("nl-nl");
  var time = new Date(UNIX_timestamp).toLocaleTimeString("nl-nl");
  var components = a.split("-");
  var day = format_num(components[0]);
  var month = format_num(components[1]);
  var year = components[2];
  var date = year + "-" + month + "-" + day;
  var iso8601_time = date + "T" + time;
  return iso8601_time;
}

export function iso2DateString(iso8601_time) {
  var format =
    iso8601_time.getDate() +
    "-" +
    (iso8601_time.getMonth() + 1) +
    "-" +
    iso8601_time.getFullYear();
  return format;
}

function format_num(num) {
  if (num.length === 1) {
    return "0" + num;
  } else {
    return num;
  }
}

export default timeConverter;
