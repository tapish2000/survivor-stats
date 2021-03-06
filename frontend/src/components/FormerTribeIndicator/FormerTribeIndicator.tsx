import React, { useContext, FunctionComponent } from 'react';
import styled from 'styled-components';
import { FormerTribeHighlightContext } from '../TribeBoard/FormerTribeHighlightContext';
import './FormerTribeIndicator.css';

interface FormerTribeIndicatorProps {
  circleColor: string;
  formerTribe: string;
  semanticTribes: { [key: string]: string };
}

const FormerTribeIndicator: FunctionComponent<FormerTribeIndicatorProps> = ({ circleColor, formerTribe, semanticTribes }) => {
  const { updateTribeHighlight } = useContext(FormerTribeHighlightContext);

  const handleHoverOn = () => {
    updateTribeHighlight({ tribeName: formerTribe, color: circleColor });
  };

  const handleHoverOff = () => {
    updateTribeHighlight({ tribeName: ``, color: `` });
  };

  const getSemanticTribeName = (tribeName: string) => {
    if (Object.keys(semanticTribes).indexOf(tribeName) > -1) {
      return semanticTribes[tribeName];
    }
    return tribeName;
  };

  const semanticTribeName = getSemanticTribeName(formerTribe);

  return (
    <TribeCircle
      className='tribe-circle tooltip'
      style={{ backgroundColor: circleColor }}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
    >
      <span className='tooltip-text'>{`Former ${semanticTribeName}`}</span>
    </TribeCircle>
  );
};

const TribeCircle = styled.div`
  border: solid #333 1.2px;
  border-radius: 50%;
  width: 0.8rem;
  height: 0.8rem;
  margin-left: 2px;
  display: inline-block;
  vertical-align: middle;
`;

export default FormerTribeIndicator;
