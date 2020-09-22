import './scss/main.scss';
import MicroModal from 'micromodal';
import './js/button-show.js'
import fethNewsAPI from './js/conect-server.js'

MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: 'data-custom-open="open"', // [3]
    closeTrigger: 'data-custom-close', // [4]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true // [10]
});

const refs = {
    inputSerch: document.querySelector('[data-input-search="input-search"]'),
    buttonSerch: document.querySelector('button[data-button="button-search"]'),
    newsList: document.querySelector('[data-news-block="news-list"]'),
    topSearchBlock: document.querySelector('[data-topsearch="block"]'),
    micromodalContentRef: document.querySelector('#modal-content-block'),
    buttonLoadMore: document.querySelector('[data-button-load="load-next"]')
}

fethNewsAPI.serchNews("top")

const hundlerButtonSerch = () => {

    fethNewsAPI.serchNews(refs.inputSerch.value);

}

const hundlertopSearch = (event) => {
    if (event.target.nodeName !== "LI") {
        return
    }
    fethNewsAPI.serchNews(event.target.dataset.topserch);
}

const hundlerButtonShowContent = (event) => {
    if (event.target.nodeName !== "BUTTON") {
        return
    }
    refs.micromodalContentRef.innerHTML = event.target.parentNode.dataset.fulldesc;
    MicroModal.show('modal-content'); // [1]
}

const hundlerButtonLoadMore = () => {
    fethNewsAPI.nextPage();
}

refs.buttonLoadMore.addEventListener('click', hundlerButtonLoadMore)
refs.newsList.addEventListener('click', hundlerButtonShowContent)
refs.buttonSerch.addEventListener('click', hundlerButtonSerch)
refs.topSearchBlock.addEventListener('click', hundlertopSearch)