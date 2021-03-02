import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loading from 'components/ShareComponent/Loading/Loading';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { withCSSTransition } from 'HOCs/hocs';
import Arrow from 'components/ShareComponent/Arrow/Arrow';
import style from './Classifier.scss';
import SportItemContainer from './SportItem/SportItemContainer';
import FirstItemContainer from './FirstItem/FirstItemContainer';

const Classifier = ({ data, switchClassifier, isLoading, moveOut }) => {
  useEffect(() => {
    if (moveOut) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [moveOut]);

  const handleCloseBtnClick = () => {
    switchClassifier({ moveOut: false });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.header}>
          <div
            aria-hidden
            className={style.closeBtn}
            onClick={handleCloseBtnClick}
          >
            <Arrow direction="left" />
            <div>
              <T {...dm('Close')} />
            </div>
          </div>
        </div>
        <div className={style.body}>
          {isLoading && <Loading className={style.loading} />}
          <ul className={classNames(style.list, isLoading && style.disable)}>
            <FirstItemContainer disableExtend name="All Games" sportId={0} />
            {Object.values(data).map(sportData => (
              <SportItemContainer
                key={sportData.id}
                name={sportData.name}
                competitionData={sportData.competition}
                sportId={sportData.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Classifier.propTypes = {
  data: PropTypes.object.isRequired,
  switchClassifier: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  moveOut: PropTypes.bool.isRequired,
};

export default withCSSTransition(Classifier, 'classifier');
