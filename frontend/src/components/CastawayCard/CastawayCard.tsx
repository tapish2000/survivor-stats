import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FormerTribeShadow } from './FormerTribeShadow';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';
import FormerTribeIndicator from '../FormerTribeIndicator/FormerTribeIndicator';
import Headshot from '../Headshot/Headshot';
import { Castaway, Tribe } from '../../types';

interface CastawayCardProps {
  castaway: Castaway;
  tribeData: Tribe[];
  episodeId: string;
  tribeColor: string;
}

const CastawayCard: FunctionComponent<CastawayCardProps> = ({
  castaway,
  tribeData,
  episodeId,
  tribeColor,
}) => {
  /**
   * For seasons in which a tribe keeps the same name throughout multiple
   * swaps, this takes a list of plain tribes (e.g. "Malolo", "Malolo 2",
   * "Malolo 3") and returns a dictionary of their semantic names (e.g.
   * "Original Malolo", "Malolo (1st swap)", "Malolo (2nd Swap)')
   */
  const getSemanticTribeNames = (formerTribeList: string[]) => {
    const semanticDictionary: { [key: string]: string } = {};

    formerTribeList.forEach(tribe => {
      const newName = tribe.replace(/2$/, `(1st swap)`).replace(/3$/, `(2nd swap)`);
      semanticDictionary[tribe] = newName;
    });
    return semanticDictionary;
  };

  // eslint-disable-next-line no-magic-numbers
  const seasonNo = `${episodeId.substring(1, 3)}`;
  const formerTribeClassNames = castaway
    .formerTribes!.map(formerTribe => `former-${formerTribe.replace(/\s/g, `-`).toLowerCase()}`)
    .join(` `);

  const semanticTribes = getSemanticTribeNames(castaway.formerTribes!);

  return (
    // @ts-ignore - issues with styled-components
    <StyledCastawayCard
      className={`castaway-card ${formerTribeClassNames}`}
      tribeName={castaway.tribe}
      tribeColor={tribeColor}
    >
      <HeadshotContainer href={castaway.wikiUrl} target='_blank'>
        <Headshot
          seasonNumber={Number(seasonNo)}
          castaway={castaway.name}
          size={90}
          borderradius={0}
        />
        {/* TODO: Set up blurred edge between face and castaway cards */}
        {/* <BlurredImageEdge /> */}
      </HeadshotContainer>
      <CardNameplate className='card-nameplate'>
        {castaway.nickname
          ? castaway.nickname
          : castaway.name.substr(0, castaway.name.indexOf(` `))}
      </CardNameplate>
      {castaway.formerTribes!.length < 1 && castaway.age ? (
        <Bio>
          <li>{`Age: ${castaway.age}`}</li>
          {castaway.occupation && <li>{castaway.occupation}</li>}
          <li>{castaway.currentResidence}</li>
        </Bio>
      ) : (
        <TribeCircleContainer className='tribe-circle-container'>
          {/* TODO: This is a messy way to get the tribe data to circumvent a rendering error.
            Fix it */}
          {tribeData && castaway.formerTribes!.length > 0 && <i className='fas fa-history' />}
          {tribeData &&
            castaway.formerTribes &&
            castaway.formerTribes.map(formerTribe => {
              const circleColor = tribeData.find(
                tribe => formerTribe.replace(/ \d/g, ``) === tribe.name,
              );
              if (circleColor) {
                return (
                  <FormerTribeIndicator
                    key={formerTribe}
                    circleColor={circleColor.tribe_color}
                    formerTribe={formerTribe}
                    semanticTribes={semanticTribes}
                  />
                );
              }
              return null;
            })}
        </TribeCircleContainer>
      )}
      {castaway.advantages && <AdvantageIcons advantages={castaway.advantages} />}
      {castaway.formerTribes && <FormerTribeShadow formerTribes={castaway.formerTribes} />}
    </StyledCastawayCard>
  );
};

const backgroundGradients = {
  orange: 'linear-gradient(to bottom, #df940a, #a36f12)',
  purple: 'linear-gradient(to right bottom, #740274, #850385, #960396, #a704a7, #b905b9);',
  green: 'linear-gradient(to bottom, #007100, #328e24, #53ac41, #72ca5e, #91ea7b)',
  blue: 'linear-gradient(to bottom, #0055f1, #004dce, #0044ab, #003a88, #0c3066);',
  black: 'linear-gradient(to bottom, #363636, #575757, #7b7b7b, #a1a1a1, #c8c8c8)',
  red: 'linear-gradient(to bottom, #ff0000, #dd0003, #bd0004, #9d0003, #7e0000)',
  yellow: 'linear-gradient(to bottom, #ffff00, #e2e201, #c6c601, #abab01, #909001);',
};

interface StyledCastawayCardProps {
  tribeColor: string;
  tribeName: string;
}

const StyledCastawayCard = styled.div<StyledCastawayCardProps>`
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;
  border-radius: 20px;
  display: grid;
  grid-template-areas:
    'headshot nameplate'
    'headshot data-line-2'
    'headshot data-line-3';
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 3px;
  max-width: 200px;
  min-width: 169px;
  width: 47%;
  height: 90px;
  margin: 5px;
  background: ${props =>
    // @ts-ignore
    backgroundGradients[props.tribeColor]};
  ${props => {
    // @ts-ignore
    const { tribeName } = props;
    if (tribeName === `Extinction Island`) {
      return `max-width: 100px; max-height: 100px;`;
    }
    if (tribeName === `out`) {
      return `max-width: 64px; max-height: 64px;`;
    }

    return null;
  }};

  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;

  &:hover,
  &:focus {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const HeadshotContainer = styled.a`
  grid-area: headshot;
  display: block;
  max-height: 100%;
  max-width: 100%;
`;

const CardNameplate = styled.div`
  grid-area: nameplate;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgb(255, 255, 255, 0.9);
  font-family: 'Londrina Solid', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  text-shadow: 3px 3px 5px black, -1px -1px 8px black;
  text-align: left;
`;

const TribeCircleContainer = styled.div`
  grid-area: data-line-2;
  text-align: left;
  color: rgba(41, 41, 41, 0.9);
`;

const Bio = styled.ul`
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  align-self: start;
  text-align: left;
  font-family: 'Londrina Solid', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  overflow: hidden;
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

// const BlurredImageEdge = styled.div`
//   grid-area: headshot;
//   box-shadow: 0 0 8px 8px white inset;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
// `;

export default CastawayCard;
