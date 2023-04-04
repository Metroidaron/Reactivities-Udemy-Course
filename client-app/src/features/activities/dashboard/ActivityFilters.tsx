
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Calendar } from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

export default observer(function ActivityFilters () {
  const { activityStore } = useStore();
  const { predicate, setPredicate } = activityStore;

    return <>
      <Menu vertical size="large" style={{width: '100%', marginTop: 27}}>
        <Header content="Filters" icon="filter" attached color="teal" />
        <Menu.Item 
          content="All Activities"
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")} />
        <Menu.Item 
          content="I'm Going"
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")} />
        <Menu.Item 
          content="I'm Hosting"
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")} />
      </Menu>

      <Header />
      <Calendar 
        onChange={(date: Date) => setPredicate('startDate', date)}
        value={predicate.get('startDate') || new Date()}/>
      
    </>
})