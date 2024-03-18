import React from 'react'
import "../CSS/apartmentCard.css"
import example from "../image/unnamed (30).jpg"
import example2 from "../image/צילום מסך 2024-02-28 152118.png"
import { useNavigate } from 'react-router-dom'
import { border } from '@mui/system'


export const ApartmentCard = (props) => {
  const{apartmentName,description,image,address,numOfBeds,additives,price,id} =props
  var demoButtons;

  function start() {

    // Add event "click" to "demo buttons"
    demoButtons = document.querySelectorAll('.js-modify');
    for (var i = 0; i < demoButtons.length; i++) {
      demoButtons[i].addEventListener('click', toggleEffect);
    }
     
    // Add event "click" to "save buttons"
    var saveButtons = document.querySelectorAll('.js-save');
    for (var i = 0; i < saveButtons.length; i++) {
      
      saveButtons[i].addEventListener('click', toggleActive);
    }

  }

  // Toggle "effect" classes
  function toggleEffect() {
    var target = document.querySelector(this.dataset.target);
    target.dataset.effect = this.dataset.effect;

    for (var i = 0; i < demoButtons.length; i++) {
      demoButtons[i].classList.remove('active');
    }

    toggleActive.call(this);
  }

  // Toggle "active" class
  function toggleActive() {
    this.classList.toggle('active');
  }

  // Invoke "start ()" function
  window.addEventListener('load', start);


  let nav = useNavigate()
  const openDetails = () => {
    nav(`/details/${apartmentName}/${description}/${address}/${numOfBeds}/${additives}/${price}/${id}`)
  }
  return <>
  <section class="wrapper" onClick={openDetails}>
    <div class="card" data-effect="zoom">
      <button class="card__save  js-save" type="button">
        <i class="fa  fa-bookmark"></i>
      </button>
      <figure class="card__image">
        <img src={`http://localhost:3002/${image}`}  alt="Short description" />
      </figure>
      <div class="card__header">
        <figure class="card__profile">
          <img src={`http://localhost:3002/uploads/logo.png`}  alt="Short description" />
  
        </figure>
      </div>
      <div class="card__body">
        <h3 class="card__name">{apartmentName}</h3>
        <p class="card__job">{description}</p>
        <p class="card__bio"> American astronaut, engineer, and the first person to walk on the Moon.</p>
      </div>
      <div class="card__footer">
        <p class="card__date">Feb 10 2018</p>
        <p class=""></p>
      </div>
    </div>
  </section>
</>
}