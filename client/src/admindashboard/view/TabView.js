import React from 'react'

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import ViewStore from './ViewStore';

function TabView() {
    return (
      <Paper square>
        <Tabs
         
          textColor='primary'
          indicatorColor='primary'
         
        
        >
          <Tab label='Items' component={ViewStore} />
          <Tab label='Sets' />
        </Tabs>
      </Paper>
    );
}

export default TabView
