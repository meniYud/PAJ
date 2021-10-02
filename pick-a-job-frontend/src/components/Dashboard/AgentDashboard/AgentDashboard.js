import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import {getPathnameSuffix, isAdminUser} from '../../../utils/functions';
import PositionsTab from '../../PositionsList/PositionsTab';
import AgentList from '../../AgentList/AgentList.component';
import CompanyList from '../../CompanyList/CompanyList.component';

const agentsTabsEnum = {
    POSITION_LIST: 'POSITION_LIST',
    AGENTS_LIST: 'AGENTS_LIST',
    COMPANY_LIST: 'COMPANY_LIST'
}
const tabsPathEnum = {
    POSITION_LIST: 'positions',
    AGENTS_LIST: 'agents',
    COMPANY_LIST: 'companies'
}

const AgentDashboard = (props) => {
    const history = useHistory();
    const { userInfo } = props;
    const [selectedTab, setSelectedTab] = useState(getInitialTab);
    let company = null
    if(props.relatedEntities?.company){
        company = props.relatedEntities.company
    }
    let isAdminAgent = isAdminUser(userInfo)

    useEffect(() => {
        const exactRoute = getPathnameSuffix(history?.location?.pathname);
        if(exactRoute !== tabsPathEnum[selectedTab]){
            history.replace(`/dashboard/${tabsPathEnum[selectedTab]}`)
        }
    }, [selectedTab]);

    function getInitialTab() {
        const exactRoute = getPathnameSuffix(history?.location?.pathname)
        
        switch(exactRoute){
            case tabsPathEnum.POSITION_LIST:
                return agentsTabsEnum.POSITION_LIST;
            case tabsPathEnum.AGENTS_LIST:
                return agentsTabsEnum.AGENTS_LIST;
            case tabsPathEnum.COMPANY_LIST:
                return agentsTabsEnum.COMPANY_LIST;
            default:
                return agentsTabsEnum.POSITION_LIST;
        }
    }

    const isTabActive = (tabName) => {
        if(selectedTab === tabName){
            return true;
        }
        return false;
    }

    const tabsComponents = {
        POSITION_LIST: <PositionsTab userInfo={props.userInfo} />,
        AGENTS_LIST: <AgentList />,
        COMPANY_LIST: <CompanyList />
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
                            {isAdminAgent && <li className="nav-item">
                                <div className={`nav-link${isTabActive(agentsTabsEnum.AGENTS_LIST) ? ' active' : ''}`} onClick={() => setSelectedTab(agentsTabsEnum.AGENTS_LIST)}>Agents</div>
                            </li>}
                            {isAdminAgent &&  <li className="nav-item">
                                <div className={`nav-link${isTabActive(agentsTabsEnum.COMPANY_LIST) ? ' active' : ''}`} onClick={() => setSelectedTab(agentsTabsEnum.COMPANY_LIST)}>Company</div>
                            </li>}
                        </ul>
                    {tabsComponents[selectedTab]}
                </div>
            </Container>
        </div>
    );
}

export default AgentDashboard;
