import React from 'react';
import './CastawayCard.css';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';

const CastawayCard = ({castaway, tribeData}) => {
  const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';

  return(
    <article className="castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2">
      <div className="tribe-circle-container">
        {tribeData && castaway.formerTribes.map(formerTribe => {
          const circleColor = tribeData.find(tribe => formerTribe.replace(/\d| /g, '') === tribe.name).tribe_color;
          return (
            <div 
              className={`tribe-circle`}
              style={{backgroundColor: circleColor}}
            />
          )
        })}
      </div>
      <AdvantageIcons castaway={castaway}/>
      <img
        src={require(`../../img/${imageFileName}`)}
        className="db br2 br--top"
        alt={castaway.name} />
      <div className="card-nameplate" >
          <h2 className="card-name br2 mv0 center tc">
            {castaway.name}
          </h2>
      </div>
    </article>
  )
}

export default CastawayCard;