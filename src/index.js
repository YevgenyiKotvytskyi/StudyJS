'use strict';

import countTimer from './modules/countTimer';
import toggelmenu from './modules/toggelmenu';
import togglePopUp from './modules/togglePopUp';
import menuScroll from './modules/menuScroll';
import tab from './modules/tab';
import slider from './modules/slider';
import imageHover from './modules/imageHover';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validation from './modules/validation';

countTimer('02 july 2020 14:00');

toggelmenu();

togglePopUp();

menuScroll();

tab();

slider();

imageHover();

calc(100);

sendForm('form2');
sendForm('form3');

validation('form2');
validation('form3');
