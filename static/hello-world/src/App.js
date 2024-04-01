import React, { useEffect, useState } from 'react';
import { CustomTag, INBOUND, OUTBOUND } from './components/CustomTag';
import { DaysChart } from './components/DaysChart';
import { TimelineChart } from './components/timelineChart';
import { DependencySection, DetailsSection, DurationSection, Wrapper, DaysRow, ChartLoading, TagWrapper } from './styles';
import { invoke } from '@forge/bridge';
import { formatChildernTimelineData, formatTimelineData, getIssueDetails, getIssueField, getStartEndFromChildren } from './utils/helper';
import { RiskSec } from './components/Risk';
import { Skeleton } from 'antd';
import { CLOSED_STATUS, IN_DEPENDENCY, IS_PARENT_TYPE, OB_DEPENDENCY, OVERDUE } from './utils/constants';
import { showNotification } from './utils/notification';


const App = () => {

  // current ticket
  const [issueData, setIssueData] = useState(null);

  // linkedIssues
  const [linkedIssues, setLinkedIssues] = useState([]);

  // Child Issues
  const [childIssues, setChildIssues] = useState([]);

  // Details of all the tickets current, parent, dependent, subtask, child issues
  const [linkedTicketDetails, setLinkedTicketDetails] = useState({});

  // Structured data for gantt chart
  const [timelineList, setTimelineList] = useState([]);

  // Loading flag to do all calc before rendering graph
  const [isChartReady, setIsChartReady] = useState(false);

  // Flag to control dependency Tag
  const [dependencyType, setDependencyType] = useState([]);

  // Loading flag for issue update
  const [updateInProgress, setUpdateInProgress] = useState(false);


  // API calls 
  const fetchIssueDetails = async () => invoke('fetchIssueDetails');
  const fetchChildIssues = async () => invoke('fetchChildIssues');
  const fetchLTDetails = async (payload) => invoke('fetchLinkedIssues', payload);
  // const sendEmail = async (val) => invoke('sendMail', val);
  const updateIssueLabel = async () => invoke('updateLabel');

  useEffect(() => {
    if(issueData?.status && !issueData.startDate && childIssues?.length) {
      const { min, max } = getStartEndFromChildren(childIssues);
      const idata = {
        ...issueData,
        startDate: min,
        dueDate: max,
      }
      setIssueData(idata);
    }
  }, [childIssues, issueData]);

  const afterLoad = () => {
    setIsChartReady(true);

    // TO SHOW POPUP NOTIFICATION

    // showNotification({
    //   show: true,
    //   title: 'Developers Dashboard',
    //   description: 'Your ticket is overdue.'
    // });

  };

  const getChildIssues = () => {
    fetchChildIssues().then((data) => {
      if (data?.issues?.length) {
        setChildIssues(data.issues.map((item) => getIssueDetails(item)));
        data.issues.forEach((item) => {
          setLinkedTicketDetails((prev) => ({
            ...prev,
            [item.key]: getIssueDetails(item)
          }))
        });
      }
    }
    ).catch(handleFetchError);
  };

  const handleFetchSuccess = (data) => {

    setTimeout(afterLoad, 5000);
    setLinkedIssues(getIssueField(data, 'issuelinks'));
    setIssueData(getIssueDetails(data));
    setLinkedTicketDetails((prev) => ({
      ...prev,
      [data?.key]: getIssueDetails(data)
    }));

    if (IS_PARENT_TYPE.includes(data?.fields?.issuetype?.name)) {
      getChildIssues();
    }
  };

  const handleFetchError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    fetchIssueDetails().then(handleFetchSuccess).catch(handleFetchError);
  }, []);

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
      if (childIssues?.length && issueData.startDate && issueData.dueDate) {
        setTimelineList(formatChildernTimelineData({
          issueData,
          childIssues,
          ltDetails: linkedTicketDetails

        }));

      } else {
        setTimelineList(formatTimelineData({
          issueData,
          linkedIssues,
          ltDetails: linkedTicketDetails,
          childIssues
        }));
      }
    }
  }, [issueData, linkedIssues, linkedTicketDetails, childIssues]);

  const current = timelineList?.length ? timelineList.find(item => item.name === issueData?.key) : {};

  useEffect(() => {

    if (current?.slip > 0) {
      // send mail to assignee with overdue & dependency details
      // const emailContent = `This issue has ${dependencyType.length ? dependencyType.join(' & ') : 'no dependency.'}\nThis issue is over due by ${current.slippedBy} day(s).`;
      // sendEmail({ text: emailContent, accountId: issueData?.assignee?.accountId, active: issueData?.assignee?.active }).then((data) => {
      // }).catch(handleFetchError);
      if ((!issueData?.labels || !issueData.labels.includes(OVERDUE)) && !updateInProgress) {
        setUpdateInProgress(true);
        updateIssueLabel().then((data) => {
          setUpdateInProgress(false);
        }).catch(() => {
          setUpdateInProgress(false);
          handleFetchError();
        });
      }
    }

  }, [issueData, current, dependencyType]);

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
            {isChartReady ? <TimelineChart timelineList={timelineList} /> : <ChartLoading>{`Fetching ticket details & dependencies ...`}</ChartLoading>}
          </DependencySection>
        </>
      ) : (<Skeleton active />)}
    </Wrapper>
  );
}

export default App;
