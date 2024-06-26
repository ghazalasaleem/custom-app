import { addBusinessDays, differenceInBusinessDays, isAfter, isBefore, subBusinessDays } from "date-fns";
import { Theme } from "../styles";
import { CLOSED_STATUS, STATUS_LIST, TODAY } from "./constants";

export const convertToDate = (date, isEnd) => {
  let result = date;
  if (date && typeof date === 'string' && date.indexOf('-')) {
    const item = date.split('-');
    if (item.length === 3)
      if (isEnd) {
        result = Date.UTC(item[0], item[1] - 1, item[2], 23, 59);
      }
      else {
        result = Date.UTC(item[0], item[1] - 1, item[2], 0, 0);
      }
  }
  return result;
}
export const getIssueDetails = (idetails) => {
  let issue = {};
  const dueDate = idetails?.fields?.customfield_10034 || idetails.fields.duedate;
  let startDate = idetails.fields.customfield_10015;

  // if Estimation has value, calculate start date accordingly

  if (idetails.fields.timeoriginalestimate && dueDate) {
    const dayDiff = Math.ceil((idetails.fields.timeoriginalestimate / 3600) / 8);
    if (dayDiff > 0) {
      startDate = subBusinessDays(convertToDate(dueDate), dayDiff).toISOString()?.split('T')[0];
    }
  }

  if (idetails && idetails.id) {
    issue = {
      id: idetails.id,
      key: idetails.key,
      jiraLink: idetails.self,
      comment: idetails.fields.comment,
      assignee: idetails.fields.assignee,
      created: idetails.fields.created,
      dueDate: dueDate,
      fixVersions: idetails.fields.fixVersions,
      issueType: idetails.fields.issuetype,
      startDate: startDate,
      status: idetails.fields.status?.name,
      originalEstimate: idetails.fields.timeoriginalestimate,
      timeEstimate: idetails.fields.timeestimate,
      subtasks: idetails.fields.subtasks,
      labels: idetails.fields.labels
    };
  }
  return issue;
};

export const getIssueField = (data, fieldName) => {
  if (data?.fields) {
    return data.fields[fieldName];
  }
  return null;
};

const calcItemData = (item, ltDetails, type, parentSlipped, parentEndDate) => {
  const itemStatus = item[type]?.fields?.status?.name || '';
  const statD = STATUS_LIST.find((item) => item.wrapperStatuses.includes(itemStatus.toUpperCase()));
  const key = item[type]?.key;
  const dueDate = ltDetails[key]?.dueDate ? convertToDate(ltDetails[key].dueDate, true) : '';
  const startDate = ltDetails[key]?.startDate ? convertToDate(ltDetails[key].startDate) : '';
  let endDate = dueDate;
  let slip = -1;
  let isParentSlipped = false;
  let dayDiff = 0;

  if (startDate < parentEndDate && parentSlipped && !CLOSED_STATUS.includes(itemStatus.toUpperCase())) {
    dayDiff = differenceInBusinessDays(parentEndDate, startDate) || 1;
    endDate = addBusinessDays(dueDate, dayDiff).getTime();
    slip = (dueDate - startDate) / (endDate - startDate);
    isParentSlipped = true;
  } else if (isAfter(TODAY, dueDate) && !CLOSED_STATUS.includes(itemStatus.toUpperCase())) {
    endDate = TODAY;
    dayDiff = differenceInBusinessDays(TODAY, dueDate) || 1;
    slip = (dueDate - startDate) / (TODAY - startDate);
  }

  return {
    name: key,
    id: item[type]?.id,
    start: startDate,
    end: endDate,
    owner: (ltDetails[key] || {}).assignee?.displayName || '',
    status: itemStatus,
    color: slip > 0 && !isParentSlipped ? Theme.risk : isParentSlipped ? Theme.moderate : statD?.customStyle?.backgroundColor || '',
    borderColor: statD?.customStyle?.borderColor || '',
    borderWidth: statD?.customStyle?.borderWidth || 0,
    issueIcon: item[type]?.fields?.issuetype?.iconUrl,
    slip: slip,
    isParentSlipped: isParentSlipped,
    slippedBy: slip > 0 ? dayDiff : '',
    completed: {
      amount: slip,
      fill: statD?.customStyle?.backgroundColor || '',
    }
  };
};

export const formatTimelineData = ({ issueData = {}, linkedIssues = [], ltDetails = {}, childIssues = [] }) => {

  const tl = [{}];
  const parentIssues = linkedIssues.filter((item) => item.inwardIssue?.key);
  const dependentIssues = linkedIssues.filter((item) => item.outwardIssue?.key);
  const statDetails = STATUS_LIST.find((item) => item.wrapperStatuses.includes(issueData?.status.toUpperCase()));
  const parentIds = [];

  if (parentIssues.length) {
    parentIssues.forEach(item => {

      parentIds.push(item?.inwardIssue?.id);
      const record = calcItemData(item, ltDetails, 'inwardIssue');
      if (record?.start && record?.end) {
        tl.push(record);
      }
    });
  }

  const dueDate = issueData?.dueDate ? convertToDate(issueData?.dueDate, true) : '';
  const startDate = issueData?.startDate ? convertToDate(issueData?.startDate) : '';

  let endDate = dueDate, currentSlipped = -1, isParentSlipped = false, dayDiff = 0;
  const isParentDelayed = tl?.length && tl[tl.length - 1]?.slip > 0 ? true : false;

  if (startDate < TODAY && isParentDelayed && !CLOSED_STATUS.includes(issueData?.status.toUpperCase())) {
    dayDiff = differenceInBusinessDays(TODAY, startDate) || 1;
    endDate = addBusinessDays(dueDate, dayDiff).getTime();
    currentSlipped = (dueDate - startDate) / (endDate - startDate);
    isParentSlipped = true;
  } else if (isAfter(TODAY, dueDate) && !CLOSED_STATUS.includes(issueData?.status?.toUpperCase())) {
    endDate = TODAY;
    dayDiff = differenceInBusinessDays(TODAY, dueDate) || 1;
    currentSlipped = (dueDate - startDate) / (TODAY - startDate);
  }
  if (startDate && endDate) {

    tl.push({
      name: issueData?.key,
      id: issueData?.id,
      start: startDate,
      end: endDate,
      owner: issueData?.assignee?.displayName,
      dependency: parentIds,
      status: issueData?.status,
      color: currentSlipped > 0 && !isParentSlipped ? Theme.risk : isParentSlipped ? Theme.moderate : statDetails?.customStyle?.backgroundColor || '',
      borderColor: statDetails?.customStyle?.borderColor || '',
      borderWidth: statDetails?.customStyle?.borderWidth || 0,
      issueIcon: issueData?.issueType?.iconUrl,
      slip: currentSlipped,
      isParentSlipped: isParentSlipped,
      slippedBy: currentSlipped > 0 ? dayDiff : '',
      completed: {
        amount: currentSlipped,
        fill: statDetails?.customStyle?.backgroundColor || '',
      }
    });
  }

  if (dependentIssues.length) {
    dependentIssues.forEach(item => {
      const record = calcItemData(item, ltDetails, 'outwardIssue', currentSlipped > 0, endDate);
      if (record?.start && record?.end) {
        tl.push({
          ...record,
          dependency: issueData.id,
        });
      }
    });
  }

  tl.push({});
  return tl;
};

export const formatChildernTimelineData = ({ issueData = {}, childIssues = [], ltDetails = [] }) => {
  const tl = [{}];
  const dueDate = issueData?.dueDate ? convertToDate(issueData?.dueDate, true) : '';
  const startDate = issueData?.startDate ? convertToDate(issueData?.startDate) : '';
  const statDetails = STATUS_LIST.find((item) => item.wrapperStatuses.includes(issueData?.status.toUpperCase()));


  let endDate = dueDate, currentSlipped = -1, dayDiff = 0;

  if (isAfter(TODAY, dueDate) && !CLOSED_STATUS.includes(issueData?.status?.toUpperCase())) {
    endDate = TODAY;
    dayDiff = differenceInBusinessDays(TODAY, dueDate) || 1;
    currentSlipped = (dueDate - startDate) / (TODAY - startDate);
  }

  if (startDate && endDate) {
    tl.push({
      name: issueData?.key,
      id: issueData?.id,
      start: startDate,
      end: endDate,
      owner: issueData?.assignee?.displayName,
      status: issueData?.status,
      color: currentSlipped > 0 ? Theme.risk : statDetails?.customStyle?.backgroundColor || '',
      borderColor: statDetails?.customStyle?.borderColor || '',
      borderWidth: statDetails?.customStyle?.borderWidth || 0,
      issueIcon: issueData?.issueType?.iconUrl,
      slip: currentSlipped,
      slippedBy: currentSlipped > 0 ? dayDiff : '',
      completed: {
        amount: currentSlipped,
        fill: statDetails?.customStyle?.backgroundColor || '',
      }
    });
  }
  let maxDelay = 0;

  if (childIssues?.length && ltDetails) {

    childIssues.forEach((item) => {
      const details = ltDetails[item?.key] || {};
      const childStatus = details.status || '';
      const statD = STATUS_LIST.find((item) => item.wrapperStatuses.includes(childStatus.toUpperCase()));

      const childDueDate = details.dueDate ? convertToDate(details.dueDate, true) : '';
      const childStartDate = details.startDate ? convertToDate(details.startDate) : '';

      let childEndDate = childDueDate, currentSlipped = -1, dayDiff = 0;

      if (isAfter(TODAY, childDueDate) && !CLOSED_STATUS.includes(childStatus.toUpperCase())) {
        childEndDate = TODAY;
        dayDiff = differenceInBusinessDays(TODAY, childDueDate) || 1;
        currentSlipped = (childDueDate - childStartDate) / (TODAY - childStartDate);
      }
      if(maxDelay < dayDiff) {
        maxDelay = dayDiff;
      }

      if (childStartDate && childDueDate) {
        tl.push({
          name: item?.key,
          id: item?.id,
          start: childStartDate,
          end: childEndDate,
          owner: details.assignee?.displayName || '',
          status: childStatus,
          color: currentSlipped > 0 ? Theme.risk : statD?.customStyle?.backgroundColor || '',
          borderColor: statD?.customStyle?.borderColor || '',
          borderWidth: statD?.customStyle?.borderWidth || 0,
          issueIcon: item?.issueType?.iconUrl,
          dependency: issueData.id,
          slip: currentSlipped,
          slippedBy: currentSlipped > 0 ? dayDiff : '',
          completed: {
            amount: currentSlipped,
            fill: statD?.customStyle?.backgroundColor || '',
          }
        });
      }
    });
  }

  if(maxDelay > 0) {

    const modifiedED = addBusinessDays(endDate,maxDelay).getTime();

    const modifiedCSlipped =  (dueDate-startDate)/(modifiedED - startDate);
    tl[1] = {
      ...tl[1],
      end: modifiedED,
      color: modifiedCSlipped > 0 ? Theme.moderate : statDetails?.customStyle?.backgroundColor || '',
      slippedBy: maxDelay,
      slip:modifiedCSlipped,
      completed: {
        amount: modifiedCSlipped,
        fill: statDetails?.customStyle?.backgroundColor || '',
      }
    };
  }

  tl.push({});
  return tl;
};

export const getMinMaxDate = (list) => {
  let min, max;
  list.forEach((item) => {
    if (!min || (min && isBefore(item.start, min))) {
      min = item.start;
    }
    if (!max || (max && isAfter(item.end, max))) {
      max = item.end
    }
  });
  if (isAfter(min, TODAY)) {
    min = TODAY;
  }
  if (isBefore(max, TODAY)) {
    max = TODAY;
  }
  return {
    min, max
  }
};

export const getStartEndFromChildren = (list) => {
  let min, max;
  list.forEach((item) => {

    const startD = convertToDate(item.startDate) || '';
    const endD = convertToDate(item.dueDate) || '';

    if (!min || (min && isBefore(startD, min))) {
      min = item.startDate;
    }
    if (!max || (max && isAfter(endD, max))) {
      max = item.dueDate;
    }
  });
  return { min, max };
};