import React, { Fragment } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Entry(): JSX.Element {
  return (
    <Fragment>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Fragment>
  );
}
