import React from 'react';
import { Paper, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Properties } from '@pages/people_detail/Index';

export default function PeopleDetailContent(props: { info: any }): JSX.Element {
  return (
    <Box marginBottom={1}>
      <Paper elevation={0} square>
        <Box>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginTop: '10px'
            }}
          >
            {props.info?.map((item: Properties) => {
              if (item.key === 'current_state') {
                return null;
              }
              return (
                <Typography
                  variant="body2"
                  style={{ marginBottom: '5px' }}
                  key={item.key_id}
                >
                  <span style={{ color: 'gray', flexWrap: 'nowrap' }}>
                    {item.key_name}:
                  </span>
                  <span
                    style={{
                      color: 'black',
                      flexWrap: 'nowrap',
                      marginLeft: '10px'
                    }}
                  >
                    {item.value}
                  </span>
                </Typography>
              );
            })}
          </div>
        </Box>
      </Paper>
    </Box>
  );
}
