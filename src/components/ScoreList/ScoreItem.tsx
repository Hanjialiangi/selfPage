import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type Props = {
  reason: string;
  point: number;
  createdAt: string;
};

export default function ScoreItem({
  reason,
  point,
  createdAt
}: Props): JSX.Element {
  return (
    <Box padding={1.5}>
      <Grid wrap="nowrap" container>
        <Grid xs={3} item>
          <Typography>{reason}</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography color={point < 0 ? 'secondary' : 'initial'}>
            {point > 0 ? '+' : ''}
            {point}
          </Typography>
        </Grid>
        <Grid xs={6} item>
          <Typography variant="caption">{createdAt}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
