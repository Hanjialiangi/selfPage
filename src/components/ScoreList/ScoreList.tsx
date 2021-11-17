import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ScoreItem from '@components/ScoreList/ScoreItem';
import { EmptyIcon } from '@components/SvgIcons';

export type Score = {
  id: number;
  reason: string;
  point: number;
  createdAt: string;
};

type Props<ScoreType> = {
  scores: ScoreType[];
  isEmpty: boolean;
};

export default function ScoreList<ScoreType extends Score>({
  scores,
  isEmpty
}: Props<ScoreType>): JSX.Element {
  return (
    <div>
      {scores.map(score => (
        <Box key={score.id} paddingX={1} paddingY={0.5}>
          <ScoreItem
            reason={score.reason}
            point={score.point}
            createdAt={score.createdAt}
          />
        </Box>
      ))}
      {isEmpty && (
        <Grid container justifyContent="center">
          <Box margin={3}>
            <EmptyIcon width="5rem" />
          </Box>
        </Grid>
      )}
    </div>
  );
}
