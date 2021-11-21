import Page from '@components/layout/Page';
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2)
      }
    }
  })
);
export default function ErrorPage(): JSX.Element {
  const classes = useStyles();
  return (
    <Page title="403">
      <div className={classes.root}>
        <Alert variant="filled" severity="error">
          您暂时无权限访问该页面
        </Alert>
      </div>
    </Page>
  );
}
