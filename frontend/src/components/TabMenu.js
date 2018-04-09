import React from 'react'
import { Tab } from 'semantic-ui-react'

const TabMenu = (props) => {
    const { tabs, onTabChange } = props
    return <Tab grid={{ paneWidth: 12, tabWidth: 4 }} menu={{ secondary: true, pointing: true }} panes={
        tabs.map(tab => ({ menuItem: tab }))
    } onTabChange={(event, data) => {
        onTabChange(tabs[data.activeIndex])
    }}/>
}

export default TabMenu