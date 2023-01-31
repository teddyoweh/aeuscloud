let tab_uuid = () => {
    let now = new Date();
    let day_of_week = now.getDay();
    let day_of_month = now.getDate();
    let month_of_year = now.getMonth();
    let year = now.getFullYear() % 10000;
    let seconds = now.getSeconds();
    let minute = now.getMinutes();
    let hour = now.getHours();
    let milliseconds = now.getMilliseconds() // 1000;
    let random_num1 = Math.floor(Math.random() * 1000);
    let random_num2 = Math.floor(Math.random() * 1000);
    let random_num3 = Math.floor(Math.random() * 1000);
    return `${day_of_week}${day_of_month}${month_of_year}${year}${seconds}${minute}${hour}${milliseconds}${random_num1}${random_num2}${random_num3}`;
}


export {tab_uuid}