import React from 'react';
import Chip from '@material-ui/core/Chip';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Close from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { ExchangeStatus, OrderStatus } from '@src/constants';
import style from '@styleModules/components/statusIcon.module.scss';
import WhatshotIcon from '@material-ui/icons/Whatshot';
type Props = {
  exchangeStatus: ExchangeStatus;
  status: OrderStatus;
  urgent?: number;
};

export default function StatusIcon({
  exchangeStatus,
  status,
  urgent
}: Props): JSX.Element | null {
  if (status === OrderStatus.AWAIT_SIGN) {
    return (
      <>
        <Chip
          icon={<RotateRightIcon />}
          size="small"
          label="等待处理"
          className={`${style.icon} ${style.pending}`}
          variant="outlined"
        />
        {urgent == 1 ? (
          <Chip
            icon={<WhatshotIcon />}
            size="small"
            style={{ marginLeft: '1%' }}
            label="加急工单"
            className={`${style.icon} ${style.pending}`}
            variant="outlined"
          />
        ) : null}
      </>
    );
  }

  if (status === OrderStatus.SIGNED) {
    return (
      <>
        <Chip
          icon={
            <svg
              width="22px"
              height="22px"
              viewBox="0 0 22 22"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>processing</title>
              <g
                id="疫情页面设计"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="疫情备份-3"
                  transform="translate(-36.000000, -191.000000)"
                  fill="#1790FF"
                  fillRule="nonzero"
                >
                  <g
                    id="进度条-处理中"
                    transform="translate(36.000000, 191.000000)"
                  >
                    <path
                      d="M15.2371914,16.8167871 C13.5031016,16.8167871 12.0975508,15.411232 12.0975508,13.6771465 C12.0975508,11.9425689 13.5031059,10.5370117 15.2371914,10.5370117 C16.9712812,10.5370117 18.376832,11.9425668 18.376832,13.6771465 C18.376832,15.4112363 16.971277,16.8167871 15.2371914,16.8167871 L15.2371914,16.8167871 Z M5.08932617,11.3167871 C4.68452617,11.3167871 4.35599355,10.9882545 4.35599355,10.5834545 C4.35599355,10.1786545 4.68452617,9.85012187 5.08932617,9.85012187 L11.6296855,9.85012187 C12.0344855,9.85012187 12.3630182,10.1786545 12.3630182,10.5834545 C12.3630182,10.9882545 12.0344855,11.3167871 11.6296855,11.3167871 L5.08932617,11.3167871 Z M10.2138652,14.6216855 L5.08932617,14.6216855 C4.68452617,14.6216855 4.35599355,14.2931529 4.35599355,13.8883529 C4.35599355,13.4835529 4.68452617,13.1550203 5.08932617,13.1550203 L10.2138652,13.1550203 C10.6186652,13.1550203 10.9471979,13.4835529 10.9471979,13.8883529 C10.9471979,14.2931529 10.6186652,14.6216855 10.2138652,14.6216855 L10.2138652,14.6216855 Z M5.08932617,6.67723633 L16.350877,6.67723633 C16.755677,6.67723633 17.0842096,7.00576895 17.0842096,7.41056895 C17.0842096,7.81536895 16.755677,8.14390156 16.350877,8.14390156 L5.08932617,8.14390156 C4.68452617,8.14390156 4.35599355,7.81536895 4.35599355,7.41056895 C4.35599355,7.00576895 4.68452617,6.67723633 5.08932617,6.67723633 L5.08932617,6.67723633 Z M11,0 C4.92458398,0 0,4.92505664 0,11 C0,17.0749434 4.92458398,22 11,22 C17.0749434,22 22,17.0749434 22,11 C22,4.92505664 17.0749434,0 11,0 L11,0 Z M17.0194492,13.5853008 L15.2472268,13.5853008 L15.2472268,12.3019682 C15.2472268,12.0316131 15.0286941,11.8130783 14.7583369,11.8130783 C14.4879818,11.8130783 14.2694471,12.0316109 14.2694471,12.3019682 L14.2694471,14.0741906 C14.2694471,14.3445457 14.4879797,14.5630805 14.7583369,14.5630805 L17.0194385,14.5630805 C17.2897936,14.5630805 17.5083283,14.3445479 17.5083283,14.0741906 C17.5083283,13.8038355 17.2897957,13.5853008 17.0194385,13.5853008"
                      id="形状"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          }
          size="small"
          label="处理中"
          color="primary"
          className={`${style.icon} ${style.processing}`}
          variant="outlined"
        />
        {urgent == 1 ? (
          <Chip
            icon={<WhatshotIcon />}
            size="small"
            style={{ marginLeft: '1%' }}
            label="加急工单"
            className={`${style.icon} ${style.processing}`}
            variant="outlined"
          />
        ) : null}
      </>
    );
  }

  if (status == OrderStatus.PROCESSING) {
    return (
      <>
        <Chip
          icon={<DoubleArrowIcon />}
          size="small"
          label="等待用户确认"
          color="primary"
          className={`${style.icon} ${style.processing}`}
          variant="outlined"
        />
        {urgent == 1 ? (
          <Chip
            icon={<WhatshotIcon />}
            size="small"
            label="加急工单"
            style={{ marginLeft: '1%' }}
            className={`${style.icon} ${style.processing}`}
            variant="outlined"
          />
        ) : null}
      </>
    );
  }

  if (status === OrderStatus.FINISHED) {
    return (
      <>
        <Chip
          icon={<DoneIcon />}
          size="small"
          label="已结束"
          color="default"
          className={`${style.icon} ${style.finished}`}
          variant="outlined"
        />
        {urgent == 1 ? (
          <Chip
            icon={<WhatshotIcon />}
            size="small"
            label="加急工单"
            style={{ marginLeft: '1%' }}
            className={`${style.icon} ${style.finished}`}
            variant="outlined"
          />
        ) : null}
      </>
    );
  }

  if (exchangeStatus === ExchangeStatus.AWAIT_EXAMINE) {
    return (
      <>
        <Chip
          icon={<RotateRightIcon />}
          size="small"
          label="待审核"
          color="default"
          className={`${style.icon} ${style.processing}`}
          variant="outlined"
        />
      </>
    );
  }

  if (exchangeStatus === ExchangeStatus.ADOPT) {
    return (
      <>
        <Chip
          icon={<DoubleArrowIcon />}
          size="small"
          label="已通过"
          color="default"
          className={`${style.icon} ${style.pending}`}
          variant="outlined"
        />
      </>
    );
  }

  if (exchangeStatus === ExchangeStatus.REJECT) {
    return (
      <>
        <Chip
          icon={<Close />}
          size="small"
          label="已驳回"
          color="default"
          className={`${style.icon} ${style.overed}`}
          variant="outlined"
        />
      </>
    );
  }

  if (exchangeStatus === ExchangeStatus.FINISHED) {
    return (
      <>
        <Chip
          icon={<DoneIcon />}
          size="small"
          label="已结束"
          color="default"
          className={`${style.icon} ${style.finished}`}
          variant="outlined"
        />
      </>
    );
  }

  return null;
}
