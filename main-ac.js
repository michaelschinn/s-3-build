const alarmClock = document.getElementById('alarmClock');

function initUi(){

    alarmClock.alarmSet = false;
    alarmClock.timeFormat = 12;
    alarmClock.amPm = 'AM';

    alarmClock.time = document.getElementById('time');
    alarmClock.hh = document.getElementById('hh');
    alarmClock.mm = document.getElementById('mm');
    alarmClock.ss = document.getElementById('ss');
    alarmClock.ap = document.getElementById('ap');
    alarmClock.dateMonth = document.getElementById('month');
    alarmClock.dateDay = document.getElementById('day');
    alarmClock.dateYear = document.getElementById('year');

    alarmClock.timeFormat12Btn = document.getElementById('set12hr');
    alarmClock.timeFormat12Btn.addEventListener('click', () => {
        if (alarmClock.timeFormat === 12){} else {
            alarmClock.timeFormat = 12;
            setTimeFormat(alarmClock.timeFormat);
            toggleClass(alarmClock.setAlarmAmBtn, 'hidden');
            toggleClass(alarmClock.setAlarmPmBtn, 'hidden');
        }
        if (alarmClock.timeFormat12Btn.classList.contains('active')){} else {
            alarmClock.timeFormat12Btn.classList.add('active');
            alarmClock.timeFormat24Btn.classList.remove('active');
        }
    });

    alarmClock.timeFormat24Btn = document.getElementById('set24hr');
    alarmClock.timeFormat24Btn.addEventListener('click', () => {
        if (alarmClock.timeFormat === 24){} else {
            alarmClock.timeFormat = 24;
            setTimeFormat(alarmClock.timeFormat);
            toggleClass(alarmClock.setAlarmAmBtn, 'hidden');
            toggleClass(alarmClock.setAlarmPmBtn, 'hidden');
        }
        if (alarmClock.timeFormat24Btn.classList.contains('active')){} else {
            alarmClock.timeFormat24Btn.classList.add('active');
            alarmClock.timeFormat12Btn.classList.remove('active');
        }
    });
    alarmClock.timeFormat_alarmFrame = document.getElementById('timeFormat_alarmFrame');

    alarmClock.setAlarmFrame = document.getElementById('setAlarmFrame');
    alarmClock.setAlarmFrameBtn = document.getElementById('setAlarm');
    alarmClock.setAlarmFrameBtn.addEventListener('click', () => {
        frameSwitch(
            alarmClock.timeFormat_alarmFrame,
            alarmClock.alarmDateFrame
        );
    });

    alarmClock.turnAlarmOffBtn = document.getElementById('turnAlarmOff');
    alarmClock.turnAlarmOffBtn.addEventListener('click', () => {
        if (alarmClock.alarmSet === true){
            alarmClock.alarmSet = false;
        }
        toggleClass(alarmClock.turnAlarmOffBtn, 'hidden');
        toggleClass(alarmClock.setAlarmFrameBtn, 'hidden');
    });

    alarmClock.dismissAlarmBtn = document.getElementById('dismissAlarmBtn');
    alarmClock.dismissAlarmBtn.addEventListener('click', () => {
        alarmClock.trigger = false;
    });

    alarmClock.snoozeBtn = document.getElementById('snoozeBtn');
    alarmClock.snoozeBtn.addEventListener('click', () => {
        if (alarmClock.trigger === true){
            alarmClock.alarmTimeSeconds = alarmClock.currentTimeSeconds + 300;
            alarmClock.trigger = false;
        }
    });

    alarmClock.alarmDateFrame = document.getElementById('alarmDateFrame');

    alarmClock.cancelSetDateBtn = document.getElementById('cancelSetDateBtn');
    alarmClock.cancelSetDateBtn.addEventListener('click', () => {
        frameSwitch(
            alarmClock.alarmDateFrame,
            alarmClock.timeFormat_alarmFrame
        );
    });

    alarmClock.setDateTodayBtn = document.getElementById('setDateTodayBtn');
    alarmClock.setDateTodayBtn.addEventListener('click', () => {
        alarmClock.alarmDateFrame.classList.add('left');
        frameSwitch(
            alarmClock.setAlarmFrame
        );
    });

    alarmClock.setDateFutureBtn = document.getElementById('setDateFutureBtn');
    alarmClock.setDateFutureBtn.addEventListener('click', () => {
        /* date picker code goes here */
    });

    alarmClock.setAlarmHours = document.getElementById('setAlarmHours');
    alarmClock.setAlarmMinutes = document.getElementById('setAlarmMinutes');
    alarmClock.setAlarmSeconds = document.getElementById('setAlarmSeconds');

    alarmClock.setAlarmAmBtn = document.getElementById('setAlarmAm');
    toggleClass(alarmClock.setAlarmAmBtn, 'active');
    alarmClock.setAlarmAmBtn.addEventListener('click', () => {
        alarmClock.amPm = 'AM';
        if (alarmClock.setAlarmAmBtn.classList.contains('active')){} else {
            alarmClock.setAlarmAmBtn.classList.add('active');
            alarmClock.setAlarmPmBtn.classList.remove('active');
        }
    });

    alarmClock.setAlarmPmBtn = document.getElementById('setAlarmPm');
    alarmClock.setAlarmPmBtn.addEventListener('click', () => {
        alarmClock.amPm = 'PM';
        if (alarmClock.setAlarmPmBtn.classList.contains('active')){} else {
            alarmClock.setAlarmPmBtn.classList.add('active');
            alarmClock.setAlarmAmBtn.classList.remove('active');
        }
    });

    alarmClock.setAlarmButton = document.getElementById('setAlarmBtn');
    alarmClock.setAlarmButton.addEventListener('click', () => {
        setAlarm();
        toggleClass(alarmClock.setAlarmFrameBtn, 'hidden');
        toggleClass(alarmClock.turnAlarmOffBtn, 'hidden');
        toggleClass(alarmClock.alarmDateFrame, 'left');
        toggleClass(alarmClock.alarmDateFrame, 'hidden');
        frameSwitch(
            alarmClock.timeFormat_alarmFrame, 
            alarmClock.setAlarmFrame
        );
    });

    alarmClock.cancelSetAlarmButton = document.getElementById('cancelSetAlarmBtn');
    alarmClock.cancelSetAlarmButton.addEventListener('click', () => {
        alarmClock.alarmDateFrame.classList.remove('left');
        frameSwitch( 
            alarmClock.setAlarmFrame
        );
    });
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
    alarmClock.month = today.getMonth() + 1;
    alarmClock.day = today.getDate();
    alarmClock.year = today.getFullYear();

    alarmClock.dateMonth.textContent = alarmClock.month;
    alarmClock.dateDay.textContent = alarmClock.day;
    alarmClock.dateYear.textContent = alarmClock.year;

    alarmClock.hours = today.getHours();
    alarmClock.minutes = today.getMinutes();
    alarmClock.seconds = today.getSeconds();
    if (alarmClock.timeFormat === 12){
        if (alarmClock.hours >= 13){
            today.time = 
                formatNumber(alarmClock.hours - 12) + 
                ':' + 
                formatNumber(alarmClock.minutes) + 
                ':' + 
                formatNumber(alarmClock.seconds) + 
                ' PM'
            ;
            alarmClock.amPm = 'PM';
        } else {
            today.time =  
                formatNumber(alarmClock.hours) + 
                ':' + 
                formatNumber(alarmClock.minutes) + 
                ':' + 
                formatNumber(alarmClock.seconds) + 
                ' AM'
            ;
            alarmClock.amPm = 'AM';
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

    alarmClock.time.textContent = today.time;
}

function toggleClass (target, className){
    target.classList.toggle(className);
}


function frameSwitch(){
    for (i = 0; i < arguments.length; i++){
        toggleClass(arguments[i], 'hidden');
    }
}

function setAlarm(){
    if (alarmClock.timeFormat === 12){
        if (alarmClock.amPm === 'AM'){
            alarmClock.alarmHours = alarmClock.setAlarmHours.value;
        } else if (alarmClock.amPm === 'PM'){
            alarmClock.alarmHours = alarmClock.setAlarmHours.value + 12;
        }
    } else {
        alarmClock.alarmHours = alarmClock.setAlarmHours.value;
    }
    alarmClock.alarmMinutes = alarmClock.setAlarmMinutes.value;
    alarmClock.alarmSeconds = alarmClock.setAlarmSeconds.value;

    alarmClock.alarmTimeSeconds = 
        convertToSeconds(
            alarmClock.alarmHours,
            alarmClock.alarmMinutes,
            alarmClock.alarmSeconds
        );

    console.log(alarmClock.alarmTimeSeconds);
    alarmClock.alarmSet = true;
}

function checkAlarm(){
    if (alarmClock.alarmSet === true){
        if (alarmClock.alarmCountdown <= 0){
            alarmClock.trigger = true;
            triggerAlarm();
        }
        alarmClock.alarmCountdown = alarmClock.alarmTimeSeconds - alarmClock.currentTimeSeconds;
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
    setTimeFormat(alarmClock.timeFormat);
    setInterval(update, 250);
}

main();