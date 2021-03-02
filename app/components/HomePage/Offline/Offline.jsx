import React, { useEffect } from 'react';
import { withMask } from 'HOCs/hocs';
import Card from 'components/ShareComponent/Card/Card';
import style from './Offline.scss';

const Offline = () => {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);
  return (
    <div className={style.container}>
      <Card>
        <Card.Header className={style.cardHeader}>
          <div className={style.text}>连线中断</div>
        </Card.Header>
        <Card.Body className={style.cardBody}>
          <div className={style.icon} />
          <div className={style.text}>与连线伺服器中断请重新整理</div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default withMask(Offline, 'Offline');
