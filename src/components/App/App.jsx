import { useState } from 'react';

import { FeedbackOptions } from 'components/FeedbackOptions';
import { Notification } from 'components/Notification';
import { Statistics } from 'components/Statistics';
import { Container } from './App.styled';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedbackList = ['good', 'neutral', 'bad'];

  const handleCounter = e => {
    const key = e.currentTarget.textContent;

    switch (key) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;
      default:
        break;
    }
  };

  const totalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = totalFeedback();
    if (good === 0) {
      return Math.round((neutral / total) * 50);
    }

    return Math.round((good / total) * 100);
  };

  return (
    <Container>
      <FeedbackOptions options={feedbackList} onLeaveFeedback={handleCounter} />

      {totalFeedback() > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={good + neutral + bad}
          positivePercentage={countPositiveFeedbackPercentage()}
        ></Statistics>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Container>
  );
};

export { App };
