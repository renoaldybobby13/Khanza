let foodLogs = JSON.parse(localStorage.getItem('foodLogs')) || {};
if(!foodLogs[todayKey]) foodLogs[todayKey] = {sarapan:[], siang:[], sore:[], malam:[]};
