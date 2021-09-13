const alarmClock = document.getElementById('alarmClock');

function initUi(){

    alarmClock.alarmSet = false;

    alarmClock.time = document.getElementById('time');

    alarmClock.setAlarmHours = document.getElementById('setAlarmHours');
    alarmClock.setAlarmMinutes = document.getElementById('setAlarmMinutes');
    alarmClock.setAlarmSeconds = document.getElementById('setAlarmSeconds');
    alarmClock.setAlarmButton = document.getElementById('setAlarmBtn');

    alarmClock.timeFormat12Btn = document.getElementById('12hr');
    alarmClock.timeFormat24Btn = document.getElementById('24hr');
    alarmClock.timeFormat = 12;
    setTimeFormat(alarmClock.timeFormat);
}

function setTimeFormat(tForm){
    if (tForm === 12){
        removeOptions(alarmClock.setAlarmHours);
        createOptions(alarmClock.setAlarmHours, tForm, true);

    } else if (tForm === 24){
        removeOptions(alarmClock.setAlarmHours);
        createOptions(alarmClock.setAlarmHours, tForm);
    }
    createOptions(alarmClock.setAlarmMinutes, 60);
    createOptions(alarmClock.setAlarmSeconds, 60);
}

function createOptions(parent, number, shift = false){
    for (var i = 0; i < number; i++){
        let elm = document.createElement('option'),
        att = document.createAttribute('value');
        if (shift === true){
            att.value = i + 1;
        } else {
            att.value = i;
        }
        elm.setAttributeNode(att);
        if (shift === true){
            if (i <= 8){
                elm.textContent = '0' + (i + 1);
            } else {
                elm.textContent = i + 1;
            }
        } else {
            if (i <= 9){
                elm.textContent = '0' + i;
            } else {
                elm.textContent = i;
            }
        }
        parent.appendChild(elm);
    }
}

function removeOptions(parent){
    for (i = parent.options.length - 1; i >= 0; i--){
        parent.remove(i);
    }
}

function formatNumber(num){
    if (num <= 9){
        let numStr = ["0", num];
        num = numStr[0] + numStr[1];
        return num;
    } else {
        num = num.toString();
        return num;
    }
}

function convertToSeconds(hours, minutes, seconds){
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    seconds = parseInt(seconds, 10);
    return (((hours * 60) + minutes) * 60) + seconds;
}

function setTime(){
    let today = new Date();
    alarmClock.hours = today.getHours();
    alarmClock.minutes = today.getMinutes();
    alarmClock.seconds = today.getSeconds();
    if (alarmClock.timeFormat === 12){
        if (alarmClock.hours >= 12){
            today.time = 
                formatNumber(alarmClock.hours - 12) + 
                ':' + 
                formatNumber(alarmClock.minutes) + 
                ':' + 
                formatNumber(alarmClock.seconds) + 
                ' PM';
        } else {
            today.time =  
                formatNumber(alarmClock.hours) + 
                ':' + 
                formatNumber(alarmClock.minutes) + 
                ':' + 
                formatNumber(alarmClock.seconds) + 
                ' AM';
        }
    } else if (alarmClock.timeFormat === 24){
        today.time = 
            formatNumber(alarmClock.hours) +
            ':' + 
            formatNumber(alarmClock.minutes) + 
            ':' + 
            formatNumber(alarmClock.seconds);
    }
    console.log(today.time);

    alarmClock.currentTimeSeconds = 
        convertToSeconds(
            alarmClock.hours, 
            alarmClock.minutes, 
            alarmClock.seconds
        );

    console.log(alarmClock.currentTimeSeconds);

    return alarmClock.time.textContent = today.time;
}

function setAlarm(){
    alarmClock.alarmHours = alarmClock.setAlarmHours.value;
    alarmClock.alarmMinutes = alarmClock.setAlarmMinutes.value;
    alarmClock.alarmSeconds = alarmClock.setAlarmSeconds.value;

    alarmClock.alarmTimeSeconds = 
        convertToSeconds(
            alarmClock.alarmHours,
            alarmClock.alarmMinutes,
            alarmClock.alarmSeconds
        );

    console.log(alarmClock.alarmTimeSeconds);

    alarmClock.alarmCountdown = alarmClock.alarmTimeSeconds - alarmClock.currentTimeSeconds;

    alarmClock.alarmSet = true;

    console.log(alarmClock.alarmCountdown);
}

function checkAlarm(){
    if (alarmClock.alarmSet === true){
        if (alarmClock.alarmCountdown <= 0){
            alarmClock.trigger = true;
            triggerAlarm();
        }
        console.log(alarmClock.alarmCountdown);
    }
}

function triggerAlarm(){
    if (alarmClock.trigger === true){
        console.log('Alarm triggered!');
    }
}

function update(){
    setTime();
    checkAlarm();
}

function main(){
    console.clear();
    initUi();
    setInterval(update, 1000);
    alarmClock.setAlarmButton.addEventListener('click', () => {
        setAlarm();
    });
    alarmClock.timeFormat12Btn.addEventListener('click', () => {
        alarmClock.timeFormat = 12;
        setTimeFormat(alarmClock.timeFormat);
    });
    alarmClock.timeFormat24Btn.addEventListener('click', () => {
        alarmClock.timeFormat = 24;
        setTimeFormat(alarmClock.timeFormat);
    });
}

main();