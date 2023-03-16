
import React from 'react'
import { Calendar } from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ActivityFilters () {
    return <>
      <Menu vertical size="large" style={{width: '100%', marginTop: 27}}>
        <Header content="Filters" icon="filter" attached color="teal" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm Going" />
        <Menu.Item content="I'm Hosting" />
      </Menu>

      <Header />
      <Calendar />
      
    </>
}