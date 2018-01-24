export const processTime = unixTimestamp => {
    const date = new Date(unixTimestamp);
    return date.toDateString() + ' at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}