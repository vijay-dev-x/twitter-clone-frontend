export const getTimeSinceCreation = (createdAt) => {
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  const difference = currentDate - creationDate;

  // Calculate the time difference
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let result;
  if (days > 0) {
    result = `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (hours > 0) {
    result = `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (minutes > 0) {
    result = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else {
    result = `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }

  return result;
};
