import React, { useEffect, useState } from 'react';
import { CustomTag, INBOUND, OUTBOUND } from './components/CustomTag';
import { DaysChart } from './components/DaysChart';
import { TimelineChart } from './components/timelineChart';
import { DependencySection, DetailsSection, DurationSection, Wrapper, DaysRow } from './styles';
// import { DayMock, issueMOCK } from './utils/mock';
import { invoke } from '@forge/bridge';
import { getIssueDetails, getIssueField } from './utils/helper';
import { RiskSec } from './components/Risk';
import { Skeleton } from 'antd';


function App() {
  const [linkedIssues, setLinkedIssues] = useState(null);
  const [issueData, setIssueData] = useState(null);
  const [linkedTicketDetails, setLinkedTicketDetails] = useState({});

  const fetchIssueDetails = async () => invoke('fetchIssueDetails');
  const fetchLTDetails = async (payload) => invoke('fetchLinkedIssues', payload);

  // Un comment below useEffect to run in local

  // useEffect(() => {
  //   setLinkedIssues(getIssueField(issueMOCK, 'issuelinks'));
  //   setIssueData(getIssueDetails(issueMOCK));
  // }, []);

  useEffect(() => {
    if (linkedIssues?.length) {
      const idList = linkedIssues.map((item) => item?.outwardIssue?.key || item?.inwardIssue?.key);
      for (let i = 0; i < idList.length; i++) {
        fetchLTDetails({ key: idList[i] }).then((data) => setLinkedTicketDetails((prev) => ({
          ...prev,
          [idList[i]]: getIssueDetails(data)
        }))).catch(handleFetchError);
      }
    }
  }, [linkedIssues]);

  useEffect(() => {
    console.log('linkedTicketDetails - ', linkedTicketDetails);
  }, [linkedTicketDetails]);

  const handleFetchSuccess = (data) => {
    console.log(data);
    setLinkedIssues(getIssueField(data, 'issuelinks'));
    setIssueData(getIssueDetails(data));
    setLinkedTicketDetails((prev) => ({
      ...prev,
      [data?.key]: getIssueDetails(data)
    }));
  };
  const handleFetchError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    fetchIssueDetails().then(handleFetchSuccess).catch(handleFetchError);
  }, []);

  const dependencyType = linkedIssues ? linkedIssues[0].inwardIssue?.key ? `Out - bound Dependency` : linkedIssues[0].outwardIssue?.key ? `In - bound Dependency` : '' : '-';

  return (
    <Wrapper>
      {issueData ? (
        <>
          <DurationSection>
            <DaysRow><DaysChart data={issueData} /></DaysRow>
            <div>
              {dependencyType &&
                <CustomTag type={dependencyType.includes('In - bound') ? INBOUND : OUTBOUND}>{dependencyType}</CustomTag>
              }
            </div>
          </DurationSection>

          <DetailsSection>
            <div>
              <label>Accuracy : </label>
              <span>40%</span>
            </div>

            <RiskSec data={issueData} />

            {/* <div>
              <label>Stack Ranking : </label>
              <span>3</span>
            </div> */}
          </DetailsSection>

          <DependencySection>
            <label>Dependency Overview</label>
            <TimelineChart issueData={issueData} linkedIssues={linkedIssues} ltDetails={linkedTicketDetails} />
          </DependencySection>
        </>
      ) : (<Skeleton active />)}
    </Wrapper>
  );
}

export default App;
