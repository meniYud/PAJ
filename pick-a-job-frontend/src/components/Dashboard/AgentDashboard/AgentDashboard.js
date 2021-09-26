import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Nav, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import PositionsTab from './PositionsTab';
import AgentsTab from './AgentsTab';
import CompanyTab from './CompanyTab';

const agentsTabsEnum = {
    POSITION_LIST: 'POSITION_LIST',
    AGENTS_LIST: 'AGENTS_LIST',
    COMPANY_DATA: 'COMPANY_DATA'
}

const AgentDashboard = (props) => {
    const { userInfo: { name: agentName } } = props;
    const [selectedTab, setSelectedTab] = useState(agentsTabsEnum.POSITION_LIST);
    let company = null
    if(props.relatedEntities?.company){
        company = props.relatedEntities.company
    }

    useEffect(() => {
        
    }, []);

    const isTabActive = (tabName) => {
        if(selectedTab === tabName){
            return true;
        }
        return false;
    }

    const tabsComponents = {
        POSITION_LIST: <PositionsTab userInfo={props.userInfo} />,
        AGENTS_LIST: <AgentsTab />,
        COMPANY_DATA: <CompanyTab />
    }

    return (
        <div className='paj-agent-dashboard eli'>
            <div className='header'>
                <Container>
                    <Row>
                        <Col>
                            <h3>Agent Dashboard</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className="tabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <div className={`nav-link${isTabActive(agentsTabsEnum.POSITION_LIST) ? ' active' : ''}`} onClick={() => setSelectedTab(agentsTabsEnum.POSITION_LIST)}>Positions</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link${isTabActive(agentsTabsEnum.AGENTS_LIST) ? ' active' : ''}`} onClick={() => setSelectedTab(agentsTabsEnum.AGENTS_LIST)}>Agents</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link${isTabActive(agentsTabsEnum.COMPANY_DATA) ? ' active' : ''}`} onClick={() => setSelectedTab(agentsTabsEnum.COMPANY_DATA)}>Company</div>
                            </li>
                        </ul>
                    {tabsComponents[selectedTab]}
                </div>
            </Container>
        </div>
    );
}

export default AgentDashboard;
