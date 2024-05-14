 export const formatEventTime = (isoString) => {
 const date = new Date(isoString);

  const optionsDate = {
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const optionsTime = {
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true, 
    timeZoneName: 'short' 
  };

  const dateString = date.toLocaleDateString('en-NZ', optionsDate);
  const timeString = date.toLocaleTimeString('en-NZ', optionsTime);

  return `${dateString} · ${timeString}`;
};

export const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end - start;
  const durationMinutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours} hour(s) ${minutes} minute(s)`;
};
