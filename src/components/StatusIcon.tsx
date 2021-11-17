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
          icon={<DoubleArrowIcon />}
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
