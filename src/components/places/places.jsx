import React, {useState} from "react";
import PropTypes from "prop-types";

import {PlaceCardType} from '../../const';
import {place as propPlace} from '../prop-types';

import PlaceCardProxy from '../place-card/place-card-proxy';


const Places = (props) => {
  const {places, cityName} = props;
  const [state, setState] = useState({
    currentCard: null
  });

  const handlePlaceCardMouseOver = (placeId) => {
    setState({
      ...state,
      currentCard: placeId
    });
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{places.length} places to stay in {cityName}</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0">
            Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex="0">Popular</li>
          <li className="places__option" tabIndex="0">Price: low to high</li>
          <li className="places__option" tabIndex="0">Price: high to low</li>
          <li className="places__option" tabIndex="0">Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {places.map((place) => <PlaceCardProxy {...place} key={`place${place.id}`} onMouseOver={handlePlaceCardMouseOver} cardType={PlaceCardType.CITIES}/>)}
      </div>
    </section>
  );
};

Places.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape(propPlace)).isRequired,
  cityName: PropTypes.string.isRequired
};

Places.defaultProps = {
  cityName: `chosen city`,
  placesNumber: 0
};

export default Places;
