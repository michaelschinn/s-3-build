const alarmClock = document.getElementById('alarmClock');

function initUi(){
    // set intial variables
    alarmClock.alarmSet = false;
    alarmClock.timeFormat = 12;
    alarmClock.amPm = 'AM';
    alarmClock.runtimeIterator = 0;

    // define display elements
    alarmClock.time = document.getElementById('time');
    alarmClock.hh = document.getElementById('hh');
    alarmClock.mm = document.getElementById('mm');
    alarmClock.ss = document.getElementById('ss');
    alarmClock.ap = document.getElementById('ap');
    alarmClock.dateMonth = document.getElementById('month');
    alarmClock.dateDay = document.getElementById('day');
    alarmClock.dateYear = document.getElementById('year');

    alarmClock.uiControls = document.getElementById('uiControls');

    // setup time format - set/disable alarm frame
    alarmClock.timeFormat_alarmFrame = document.getElementById('timeFormat_alarmFrame');
    alarmClock.timeFormat12Btn = document.getElementById('set12hr');
    alarmClock.timeFormat12Btn.addEventListener('click', () => {
        if (alarmClock.timeFormat === 12){} else {
            alarmClock.timeFormat = 12;
            //setTimeFormat(alarmClock.timeFormat);
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
            //setTimeFormat(alarmClock.timeFormat);
            //toggleClass(alarmClock.setAlarmAmBtn, 'hidden');
            //toggleClass(alarmClock.setAlarmPmBtn, 'hidden');
        }
        if (alarmClock.timeFormat24Btn.classList.contains('active')){} else {
            alarmClock.timeFormat24Btn.classList.add('active');
            alarmClock.timeFormat12Btn.classList.remove('active');
        }
    });
    alarmClock.setAlarmFrameBtn = document.getElementById('setAlarm');
    alarmClock.setAlarmFrameBtn.addEventListener('click', () => {
        frameSwitcher(
            alarmClock.timeFormat_alarmFrame,
            alarmClock.setAlarmFrame,
            'slideLeft'
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

    // setup alarm triggered frame
    alarmClock.alarmTriggeredFrame = document.getElementById('alarmTriggeredFrame');
    alarmClock.dismissAlarmBtn = document.getElementById('dismissAlarmBtn');
    alarmClock.dismissAlarmBtn.addEventListener('click', () => {
        alarmClock.alarmSet = false;
        alarmClock.trigger = false;
        toggleClass(alarmClock.uiControls, 'alarmTriggered');
        frameSwitcher(
            alarmClock.alarmTriggeredFrame,
            alarmClock.timeFormat_alarmFrame,
            'slideRight'
        );
        toggleClass(alarmClock.turnAlarmOffBtn, 'hidden');
        toggleClass(alarmClock.setAlarmFrameBtn, 'hidden');
        untriggerAlarm();
    });

    alarmClock.snoozeBtn = document.getElementById('snoozeBtn');
    alarmClock.snoozeBtn.addEventListener('click', () => {
        alarmClock.alarmTime = getTime();
        alarmClock.trigger = false;
        toggleClass(alarmClock.uiControls, 'alarmTriggered');
        frameSwitcher(
            alarmClock.alarmTriggeredFrame,
            alarmClock.timeFormat_alarmFrame,
            'slideRight'
        );
        toggleClass(alarmClock.turnAlarmOffBtn, 'hidden');
        toggleClass(alarmClock.setAlarmFrameBtn, 'hidden');
        untriggerAlarm();
    });

    // setup alarm date frame
    /*
    alarmClock.alarmDateFrame = document.getElementById('alarmDateFrame');

    alarmClock.cancelSetDateBtn = document.getElementById('cancelSetDateBtn');
    alarmClock.cancelSetDateBtn.addEventListener('click', () => {
        frameSwitcher(
            alarmClock.alarmDateFrame,
            alarmClock.timeFormat_alarmFrame,
            'slideRight'
        );
    });

    alarmClock.setDateTodayBtn = document.getElementById('setDateTodayBtn');
    alarmClock.setDateTodayBtn.addEventListener('click', () => {
        alarmClock.alarmDateFrame.classList.add('left');
        frameSwitcher(
            alarmClock.alarmDateFrame,
            alarmClock.setAlarmFrame,
            'slideLeft'
        );
    });
    alarmClock.setDateFutureBtn = document.getElementById('setDateFutureBtn');
    alarmClock.setDateFutureBtn.addEventListener('click', () => {
        frameSwitcher(
            alarmClock.alarmDateFrame,
            alarmClock.alarmFutureDateFrame,
            'slideLeft'
        )
    });

*/
    // Set Future Date Frame
    /*
    alarmClock.alarmFutureDateFrame = document.getElementById('alarmFutureDateFrame');

    alarmClock.cancelSetFutureDateBtn = document.getElementById('cancelSetFutureDateBtn');
    alarmClock.cancelSetFutureDateBtn.addEventListener('click', () => {
        frameSwitcher(
            alarmClock.alarmFutureDateFrame,
            alarmClock.alarmDateFrame,
            'slideRight'
        );
    });

    alarmClock.setFutureAlarmBtn = document.getElementById('setFutureAlarmBtn');
    alarmClock.setFutureAlarmBtn.addEventListener('click', () => {
        frameSwitcher(
            alarmClock.alarmFutureDateFrame,
            alarmClock.setAlarmFrame,
            'slideLeft'
        );
    });
*/

    // setup set alarm frame
    alarmClock.setAlarmFrame = document.getElementById('setAlarmFrame');
/*
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
*/
    alarmClock.setAlarmDate = document.getElementById('setAlarmDate');
    alarmClock.setAlarmTime = document.getElementById('setAlarmTime');
    alarmClock.setAlarmButton = document.getElementById('setAlarmBtn');
    alarmClock.setAlarmButton.addEventListener('click', () => {
        setAlarm();

        frameSwitcher(
            alarmClock.setAlarmFrame,
            alarmClock.timeFormat_alarmFrame,
            'slideRight'
        )

        toggleClass(alarmClock.setAlarmFrameBtn, 'hidden');
        toggleClass(alarmClock.turnAlarmOffBtn, 'hidden');
    });

    alarmClock.cancelSetAlarmButton = document.getElementById('cancelSetAlarmBtn');
    alarmClock.cancelSetAlarmButton.addEventListener('click', () => {
        frameSwitcher( 
            alarmClock.setAlarmFrame,
            alarmClock.timeFormat_alarmFrame,
            'slideRight'
        );
    });
}

function frameSwitcher(activeFrame, nextFrame, trans, otherFrames = undefined){
    switch (trans) {
        case 'slideLeft':
            nextFrame.classList.remove('hidden');
            activeFrame.classList.add('left');
            break;
        
        case 'slideRight':
            nextFrame.classList.remove('left');
            activeFrame.classList.add('hidden');
            break;
        
        case 'instant':
            let nextFrameTransition = nextFrame.style.transisiton,
            activeFrameTransisition = activeFrame.style.transition;
            nextFrame.style.transition = '';
            activeFrame.style.transisition = '';
            nextFrame.classList.remove('hidden');
            activeFrame.classList.add('hidden');
            nextFrame.style.transition = nextFrameTransition;
            activeFrame.style.transition = activeFrameTransisition;

        default:
            break;
    }
    if (otherFrames !== undefined){
        for (let i = 0; i < otherFrames.length; i++){
            let currentTransition = otherFrames[i].style.transition;
            if (otherFrames[i].classList.contains('left')){
                otherFrames[i].style.transition = '';
                otherFrames[i].classList.replace('left', 'hidden');
                otherFrames[i].style.transition = currentTransition;
            }
        }
    }
    alarmClock.currentFrame = nextFrame;
    alarmClock.lastFrame = activeFrame;
}

function setTimeFormat(tForm){
    if (tForm === 12){
        removeOptions(alarmClock.setAlarmHours);
        createOptions(alarmClock.setAlarmHours, tForm, true);

    } else if (tForm === 24){
        removeOptions(alarmClock.setAlarmHours);
        createOptions(alarmClock.setAlarmHours, tForm);
    }
    removeOptions(alarmClock.setAlarmMinutes);
    createOptions(alarmClock.setAlarmMinutes, 60);
    removeOptions(alarmClock.setAlarmSeconds);
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

function getTime(){
    let today = new Date();

    alarmClock.hours = today.getHours();
    alarmClock.minutes = today.getMinutes();
    alarmClock.seconds = today.getSeconds();

    alarmClock.theTime = formatNumber(alarmClock.hours) + ':' + formatNumber(alarmClock.minutes + 5);

    return alarmClock.theTime;
}

function setTime(){
    let today = new Date();
    alarmClock.month = today.getMonth() + 1;
    alarmClock.day = today.getDate();
    alarmClock.year = today.getFullYear();

    alarmClock.dateMonth.textContent = alarmClock.month;
    alarmClock.dateDay.textContent = alarmClock.day;
    alarmClock.dateYear.textContent = alarmClock.year;

    alarmClock.theDate = alarmClock.year + '-' + formatNumber(alarmClock.month) + '-' + formatNumber(alarmClock.day);

    alarmClock.hours = today.getHours();
    alarmClock.minutes = today.getMinutes();
    alarmClock.seconds = today.getSeconds();

    alarmClock.theTime = formatNumber(alarmClock.hours) + ':' + formatNumber(alarmClock.minutes);

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
    console.log(alarmClock.theDate + '  ' + alarmClock.theTime);

    alarmClock.currentTimeSeconds = 
        convertToSeconds(
            alarmClock.hours, 
            alarmClock.minutes, 
            alarmClock.seconds
        );

    //console.log(alarmClock.currentTimeSeconds);

    alarmClock.time.textContent = today.time;
}

function toggleClass (target, className){
    target.classList.toggle(className);
}

function setAlarm(){
    /*
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
*/
    alarmClock.alarmDate = alarmClock.setAlarmDate.value;
    console.log(alarmClock.alarmDate);
    alarmClock.alarmTime = alarmClock.setAlarmTime.value;
    console.log(alarmClock.alarmTime);
    //console.log(alarmClock.alarmTimeSeconds);
    alarmClock.alarmSet = true;
}

function checkAlarm(){
    if (alarmClock.alarmSet === true){
        /*
        if (alarmClock.alarmCountdown <= 0){
            triggerAlarm();
        } else {
            untriggerAlarm();
        }
        alarmClock.alarmCountdown = alarmClock.alarmTimeSeconds - alarmClock.currentTimeSeconds;
        */
        if (alarmClock.alarmDate === alarmClock.theDate && alarmClock.alarmTime === alarmClock.theTime){
            triggerAlarm();
        } else if (alarmClock.alarmTime === alarmClock.theTime){
            triggerAlarm();
        }
        //console.log(alarmClock.alarmCountdown);
    }
}

function triggerAlarm(){
    alarmClock.trigger = true;
    clearInterval(alarmClock.timer);
    toggleClass(alarmClock.uiControls, 'alarmTriggered');
    frameSwitcher(
        alarmClock.timeFormat_alarmFrame,
        alarmClock.alarmTriggeredFrame,
        'slideLeft'
    );
    alarmClock.alarmSound = playSound('alarm-clock-beep.mp3');
    alarmClock.alarmTriggerTimer = setInterval(alarmClock.alarmSound, 1000);
    console.log('Alarm triggered!');
}

function untriggerAlarm(){
    alarmClock.trigger = false;
    clearInterval(alarmClock.alarmTriggerTimer);
    alarmClock.timer = setInterval(update, 1000);
}

function playSound(file){
    let sound = new Audio(file);
    sound.play();
}

function update(){
    setTime();
    checkAlarm();
}

function main(){
    console.clear();
    initUi();
    //setTimeFormat(alarmClock.timeFormat);
    alarmClock.timer = setInterval(update, 1000);
}

main();