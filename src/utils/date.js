function timeAgo(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString + ' UTC'); // Append 'UTC' to the input date string
    const timeDifference = currentDate - inputDate;

    // Convert time difference to seconds, minutes, hours, or days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        // Format date as "day month"
        const options = { day: 'numeric', month: 'long' };
        return inputDate.toLocaleDateString('en-US', options);
    }
}

export {timeAgo};