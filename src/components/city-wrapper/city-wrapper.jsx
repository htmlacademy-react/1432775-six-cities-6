import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {useDispatch, useSelector} from "react-redux";

import {getOffers} from "../../store/reducers/data/selectors";
import {getActiveCity} from "../../store/reducers/work-process/selectors";

import {cities} from '../../const';
import {changeCity} from "../../store/action-creators";

import OffersList from '../offers-list/offers-list';
import Map from '../map/map';


const CityWrapper = ({city}) => {
  const activeCity = useSelector(getActiveCity);
  const offers = useSelector(getOffers);
  const dispatch = useDispatch();

  const filteredOffers = offers.slice().filter((offer) => cities[offer.city.name] === city);
  const isEmpty = filteredOffers.length < 1;

  const containerEmptyClassName = isEmpty ? ` cities__places-container--empty` : ``;

  useEffect(() => {
    if (activeCity !== city) {
      dispatch(changeCity(city));
    }
  });

  return (
    <div className="cities">
      <div className={`cities__places-container container${containerEmptyClassName}`}>
        {isEmpty ?
          <>
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </>
          :
          <>
            <OffersList offers={filteredOffers} cityName={city} key={`${city}-OffersList`}/>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={filteredOffers}/>
              </section>
            </div>
          </>
        }
      </div>
    </div>
  );
};

CityWrapper.propTypes = {
  city: PropTypes.oneOf(Object.values(cities)).isRequired
};

export default CityWrapper;
