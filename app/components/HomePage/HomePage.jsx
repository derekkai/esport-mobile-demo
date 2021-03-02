import React, { useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import MainContainer from './Main/MainContainer';
import KeyBoardContainer from './KeyBoard/KeyBoardContainer';
import BetslipContainer from './Betslip/BetslipContainer';
import FooterContainer from './Footer/FooterContainer';
import RecordContainer from './Record/RecordContainer';
import AlertContainer from './Alert/AlertContainer';
import NewsContainer from './News/NewsContainer';
import Offline from './Offline/Offline';
import style from './HomePage.scss';

const HomePage = ({
  gameListType,
  setGameListType,
  location,
  setMainDataType,
  loading,
  openModal,
  closeModal,
  modal,
  offline,
}) => {
  useEffect(() => {
    setTimeout(() => {
      const appLoading = document.querySelector('.app-loading');
      appLoading.style.opacity = 0;
      setTimeout(() => {
        appLoading.remove();
      }, 300);
    }, 300);
  }, []);

  useEffect(() => {
    if (loading) return;
    const { pathname } = location;
    const paths = pathname.split('/');
    const [, GameListType, viewPoint] = paths;
    if (viewPoint === 'market') {
      setMainDataType('market');
    } else {
      setMainDataType('game');
    }
    switch (GameListType) {
      case '':
      case 'upcoming':
        if (gameListType !== 'upcoming') setGameListType('upcoming');
        if (modal) closeModal();
        break;
      case 'result':
        if (gameListType !== 'result') setGameListType('result');
        if (modal) closeModal();
        break;
      case 'champion':
        if (gameListType !== 'champion') setGameListType('champion');
        if (modal) closeModal();
        break;
      case 'betslip':
        openModal('betslip');
        break;
      case 'record':
        openModal('record');
        break;
      case 'news':
        openModal('news');
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <>
      {!loading && (
        <div className={style.container}>
          <Header />
          <MainContainer />
          <FooterContainer />
          <BetslipContainer />
          <KeyBoardContainer />
          <RecordContainer />
          <AlertContainer />
          <NewsContainer />
          <Offline in={offline} />
        </div>
      )}
    </>
  );
};

HomePage.propTypes = {
  gameListType: PropTypes.string.isRequired,
  setGameListType: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  setMainDataType: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modal: PropTypes.string.isRequired,
  offline: PropTypes.bool.isRequired,
};

export default HomePage;
