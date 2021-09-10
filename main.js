const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let  storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.",

insertx = ['Willy the Goblin','Big Daddy','Father Christmas'],

inserty = ['the soup kitchen','Disneyland','the White House'],

insertz = ['spontaneously combusted','melted into a puddle on the sidewalk','turned into a slug and crawled away'];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText,
    itemX = randomValueFromArray(insertx),
    itemY = randomValueFromArray(inserty),
    itemZ = randomValueFromArray(insertz);
    newStory = newStory.replace(':insertx:', itemX);

    newStory = newStory.replace(':insertx:', itemX);
    newStory = newStory.replace(':inserty:', itemY);
    newStory = newStory.replace(':insertz:', itemZ);

    if(customName.value !== '') {
        let name = customName.value;
        newStory = newStory.replace('Bob', name);

    }

    if(document.getElementById("uk").checked) {
        let weight = Math.round(300 / 14) + ' stone',
        temperature =  Math.round((94 - 32) * .5556) + ' centigrade';

        newStory = newStory.replace('300 pounds', weight);
        newStory = newStory.replace('94 fahrenheit', temperature);

    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}