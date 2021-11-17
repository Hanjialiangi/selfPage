import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import commonStyle from '@styleModules/common.module.scss';
import { getTextEllipsis } from '@src/utils';
import Link from '@components/Link';

type Props = {
  number: number;
  title: string;
  url: string;
};

export default function OrderEntry({ number, title, url }: Props): JSX.Element {
  /* 省略后的工单标题 */
  const [titleEllipsis, setTitleEllipsis] = useState('');

  useEffect(() => {
    setTitleEllipsis(getTextEllipsis(title, 45));
  }, [title]);

  return (
    <Link className={commonStyle.fullWidth} to={url}>
      <Box padding={1.5}>
        <Grid alignItems="flex-start" wrap="nowrap" container>
          <Grid xs={11} container wrap="nowrap" alignItems="flex-start" item>
            <Grid xs={1} item>
              <Typography variant="body2">{number}.</Typography>
            </Grid>
            <Grid xs={11} item>
              <Typography variant="body2">{titleEllipsis}</Typography>
            </Grid>
          </Grid>
          <ChevronRightIcon color="action" />
        </Grid>
      </Box>
      <Divider />
    </Link>
  );
}
