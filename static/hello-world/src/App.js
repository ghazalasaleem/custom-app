import React, { useEffect, useState } from 'react';
import { CustomTag, INBOUND, OUTBOUND } from './components/CustomTag';
import { DaysChart } from './components/DaysChart';
import { TimelineChart } from './components/timelineChart';
import { DependencySection, DetailsSection, DurationSection, Wrapper, DaysRow, ChartLoading, TagWrapper } from './styles';
import { invoke } from '@forge/bridge';
import { formatTimelineData, getIssueDetails, getIssueField } from './utils/helper';
import { RiskSec } from './components/Risk';
import { Skeleton } from 'antd';
import { CLOSED_STATUS, IN_DEPENDENCY, OB_DEPENDENCY } from './utils/constants';


function App() {
  const [linkedIssues, setLinkedIssues] = useState(null);
  const [issueData, setIssueData] = useState(null);
  const [linkedTicketDetails, setLinkedTicketDetails] = useState({});
  const [timelineList, setTimelineList] = useState([]);
  const [isChartReady, setIsChartReady] = useState(false)
  const [dependencyType, setDependencyType] = useState([]);
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
      const obD = linkedIssues.filter(item => item?.inwardIssue?.key);
      const ibD = linkedIssues.filter(item => item?.outwardIssue?.key);
      const dtList = [];
      if (obD?.length) {
        dtList.push(OB_DEPENDENCY);
      }
      if (ibD?.length) {
        dtList.push(IN_DEPENDENCY);
      }
      setDependencyType(dtList);
    }
  }, [linkedIssues]);

  useEffect(() => {
    if (issueData?.id) {
      setTimelineList(formatTimelineData({
        issueData,
        linkedIssues,
        ltDetails: linkedTicketDetails
      }));
    }
  }, [issueData, linkedIssues, linkedTicketDetails]);

  const current = timelineList?.length ? timelineList.find(item => item.name === issueData?.key) : {};

  const handleFetchSuccess = (data) => {
    // console.log(data);
    setTimeout(() => setIsChartReady(true), 5000);
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

  return (
    <Wrapper>
      {issueData ? (
        <>
          <DurationSection>
            <DaysRow>
              <DaysChart data={issueData} />
              <DetailsSection>
                <div>
                  <label>Accuracy : </label>
                  <span>{current?.slip > 0 && !CLOSED_STATUS.includes(issueData?.status.toUpperCase()) ? `${Math.floor(current?.isParentSlipped ? (100 - (current?.slip * 100)) : (current?.slip * 100))}%` : '100%'}</span>
                </div>

                <RiskSec data={issueData} current={current} />

                {/* <div>
                <label>Stack Ranking : </label>
                <span>3</span>
                </div> */}
              </DetailsSection>
            </DaysRow>
            <TagWrapper>
              {dependencyType.map((item) => (
                <CustomTag key={item} type={item.includes('In - bound') ? INBOUND : OUTBOUND}>{item}</CustomTag>
              ))
              }
            </TagWrapper>
          </DurationSection>



          <DependencySection>
            <label>Dependency Overview</label>
            {isChartReady ? <TimelineChart timelineList={timelineList} setTimelineList={setTimelineList} /> : <ChartLoading>{`Fetching ticket details & dependencies ...`}</ChartLoading>}
          </DependencySection>
        </>
      ) : (<Skeleton active />)}
    </Wrapper>
  );
}

export default App;
