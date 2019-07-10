/**
 * The embedded calendar.
 */
import React from 'react';
import Grid from '@material-ui/core/Grid';

export default () => (
    <div>
        <Grid container spacing={32} style={{ padding: 30, align: 'center' }}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <iframe
                    src="https://calendar.google.com/calendar/embed?src=8210veguh4d59c70bnvm8t8mvk%40group.calendar.google.com&ctz=America%2FChicago"
                    style={{
                      border: 0,
                    }}

                    width="100%"
                    height="800px"
                    frameBorder="0"
                    scrolling="no"
                    title="google calendar"
                />

            </Grid>
            <Grid item xs={1} />
        </Grid>
    </div>
);
