import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { timeConvert } from 'helpers/common';
import { withRouter } from 'react-router-dom';
import { withCSSTransition } from 'HOCs/hocs';
import Item from './Item/Item';
import style from './News.scss';

const News = ({ history, entity }) => {
  const handleGoBackBtnClick = () => {
    history.goBack();
  };

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div
          aria-hidden
          className={style.goBackBtn}
          onClick={handleGoBackBtnClick}
        />
        <div className={style.title}>
          <T {...dm('News')} />
        </div>
      </div>
      <div className={style.body}>
        <ul className={style.list}>
          {entity.map(news => {
            const { Type, Title, PublishDateTime, Content } = news;
            const tiemstamp = new Date(PublishDateTime).getTime();
            const { month, day, hours, minute } = timeConvert(tiemstamp / 1000);
            const date = `${month}/${day} ${hours}:${minute}`;

            return (
              <Item type={Type} title={Title} date={date} content={Content} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

News.propTypes = {
  history: PropTypes.object.isRequired,
  entity: PropTypes.array.isRequired,
};

export default withRouter(withCSSTransition(News, 'News'));
