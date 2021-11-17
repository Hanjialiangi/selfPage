import React, { PropsWithChildren } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from '@components/Link';

type Props = PropsWithChildren<{
  url: string;
}>;

export default function Navigation({ url, children }: Props): JSX.Element {
  return (
    <Link to={url}>
      <Box marginBottom={1.5}>
        <Paper elevation={0} square>
          <Box padding={1.5}>
            <Grid justifyContent="space-between" container>
              {children}
              <ChevronRightIcon color="action" />
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Link>
  );
}
