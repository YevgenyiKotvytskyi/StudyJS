

import 'nodelist-foreach-polyfill';
import "@babel/polyfill";
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise/auto';
import 'fetch-polyfill';

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


const actionTime = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
countTimer(actionTime);

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
