import React from 'react';
import { Attempt as AttemptType } from '../../model';
import Attempt from '../components/attempt';

const AttemptHistory: React.FC<{ attempts: AttemptType[] }> = ({
  attempts,
}) => {
  const attemptHistoryDisplay = attempts.map((attempt) => (
    <Attempt attempt={attempt} />
  ));
  return <div>{attemptHistoryDisplay}</div>;
};

export default AttemptHistory;
