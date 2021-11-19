import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BackupIcon from '@material-ui/icons/Backup';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1)
      }
    }
  })
);

export function UploadButton(): JSX.Element {
  const classes = useStyles();

  //健康弹窗
  const HealthyConfirm = () => {
    window.location.href = '/dist/';
  };

  //人员弹窗
  const PeopleConfirm = () => {
    window.location.href = '/dist/';
  };
  return (
    <div className={classes.root}>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<BackupIcon />}
        onClick={HealthyConfirm}
      >
        健康状况批量上报
      </Button>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<PublishIcon />}
        onClick={PeopleConfirm}
      >
        人员名单批量导入
      </Button>
    </div>
  );
}
