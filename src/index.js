import './styles.less'

import {touchStart, touchEnd} from './touchHelper'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const rootElem = $('div#root')
const musicElem = rootElem.querySelector('.audioPlayer')
const musicIcon = rootElem.querySelector('div.icon-music')
const titleElem = rootElem.querySelector('div.title')

let currentPage = 0
const TOTAL_PAGE = $$('.imgWrapper').length

// start playing...
musicElem.addEventListener('canplay', (e) => {
  musicElem.play()
  musicIcon.classList.add('playing')
})
// adding event listeners for musicElem
musicIcon.addEventListener('click', (e) => {
  if (musicElem.paused) {
    musicElem.play()
    musicIcon.classList.add('playing')
  } else {
    musicElem.pause()
    musicIcon.classList.remove('playing')
  }
})

document.addEventListener('touchmove', (e) => {
  e.preventDefault()
})

window.addEventListener('load', (e) => {
  console.log('loaded!')
  $('div#shade').style.display = 'none'
})

rootElem.addEventListener('touchstart', (e) => {
  touchStart(e)
})
rootElem.addEventListener('touchend', (e) => {
  let {eventName} = touchEnd(e)
  if (eventName === 'up') {
    handleSwipeUp()
  } else if (eventName === 'down') {
    handleSwipeDown()
  }
})

function handleSwipeUp () {
  // entering page 1...
  if (currentPage === 0) {
    rootElem.querySelector('div.swipeIndicator').classList.toggle('faded')
    titleElem.classList.toggle('faded')
  }
  if (currentPage < TOTAL_PAGE) {
    let showedImg = [...rootElem.querySelectorAll('div.imgWrapper')].filter((elem, index) => index === currentPage)[0]
    let currentContent = [...rootElem.querySelectorAll('div.contentWrapper')].filter((elem, index) => index === currentPage)[0]
    let restContent = [...rootElem.querySelectorAll('div.contentWrapper')].filter((elem, index) => index !== currentPage)
    if (showedImg) {
      showedImg.classList.add('showed')
      showedImg.style.transform = `rotate(${(Math.random() - 0.5) * 15}deg)`
    }
    if (currentContent) {
      currentContent.classList.add('showed')
    }
    if (restContent) {
      restContent.forEach(elem => elem.classList.remove('showed'))
    }
    currentPage ++
  }
  console.log(currentPage)
}

function handleSwipeDown() {
  if (currentPage === 1) {
    rootElem.querySelector('div.swipeIndicator').classList.toggle('faded')
    titleElem.classList.toggle('faded')
  }
  if (currentPage > 0) {
    currentPage --
    let showedImg = [...rootElem.querySelectorAll('div.imgWrapper')].filter((elem, index) => index === currentPage)[0]
    let currentContent = [...rootElem.querySelectorAll('div.contentWrapper')].filter((elem, index) => index === currentPage - 1)[0]
    let restContent = [...rootElem.querySelectorAll('div.contentWrapper')].filter((elem, index) => index !== currentPage - 1)
    if (showedImg) {
      showedImg.classList.remove('showed')
      showedImg.style.transform = ''
    }
    if (currentContent) {
      currentContent.classList.add('showed')
    }
    if (restContent) {
      restContent.forEach(elem => elem.classList.remove('showed'))
    }
  }
  console.log(currentPage)
}