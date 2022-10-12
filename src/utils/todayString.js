export const todayString = () => {
    const string = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "other"];

    const d = new Date();
    const query = string[d.getDay()];

    return(
        query
    )
}