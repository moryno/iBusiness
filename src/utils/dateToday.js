// Getting date today
const dateToday = () => {
    const year = new Date().getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    return dateString;

}

export default dateToday;

// End of function