import React from 'react';
import BetCard from './BetCard/BetCardContainer';

const BetList = ({ keys }) => {
  return keys.map(eventId => <BetCard key={eventId} eventId={eventId} />);
};

export default BetList;
