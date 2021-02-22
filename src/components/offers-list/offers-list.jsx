import React, {useState} from "react";
import PropTypes from "prop-types";

import {OfferCardType} from '../../const';
import {propOffer} from '../prop-types';

import OfferCardProxy from '../offer-card/offer-card-proxy';

const OffersList = (props) => {
  const {offers, cityName} = props;
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
      <b className="places__found">{offers.length} places to stay in {cityName}</b>
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
        {offers.map((offer) => <OfferCardProxy {...offer} key={`offer${offer.id}`} onMouseOver={handlePlaceCardMouseOver} cardType={OfferCardType.CITIES}/>)}
      </div>
    </section>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(propOffer)).isRequired,
  cityName: PropTypes.string.isRequired
};

OffersList.defaultProps = {
  cityName: `chosen city`,
  offersNumber: 0
};

export default OffersList;
