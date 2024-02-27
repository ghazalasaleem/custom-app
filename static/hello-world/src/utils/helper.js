import { differenceInCalendarDays, isAfter, isBefore } from "date-fns";
import { Theme } from "../styles";
import { DAY, STATUS_LIST, TODAY } from "./constants";

export const convertToDate = (date, isEnd) => {
  let result = '';
  if (date && date.indexOf('-')) {
    const item = date.split('-');
    if (item.length === 3)
      if (isEnd) {
        result = new Date(item[0], item[1] - 1, item[2], 23, 59);
      }
      else {
        result = new Date(item[0], item[1] - 1, item[2]);

      }
  }
  return result;
}
export const getIssueDetails = (idetails) => {
  let issue = {};
  if (idetails && idetails.id) {
    issue = {
      id: idetails.id,
      key: idetails.key,
      jiraLink: idetails.self,
      comment: idetails.fields.comment,
      assignee: idetails.fields.assignee,
      created: idetails.fields.created,
      dueDate: idetails?.fields?.customfield_10034 || idetails.fields.duedate,
      fixVersions: idetails.fields.fixVersions,
      issueType: idetails.fields.issuetype,
      startDate: idetails.fields.customfield_10015,
      status: idetails.fields.status?.name,
      originalEstimate: idetails.fields.timeoriginalestimate,
      timeEstimate: idetails.fields.timeestimate,
      // efd: idetails?.fields?.customfield_10034,
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

const calcItemData = (item, ltDetails, type) => {
  const itemStatus = item[type]?.fields?.status?.name || '';
  const statD = STATUS_LIST.find((item) => item.wrapperStatuses.includes(itemStatus.toUpperCase()));
  const key = item[type]?.key;
  const dueDate = ltDetails[key]?.dueDate ? convertToDate(ltDetails[key].dueDate, true)?.getTime() : '';
  const startDate = ltDetails[key]?.startDate ? convertToDate(ltDetails[key].startDate)?.getTime() : '';
  const isSlipped = isAfter(TODAY, dueDate);
  const endDate = isSlipped ? TODAY : dueDate;
  const slip = isSlipped ? (dueDate - startDate) / (TODAY - startDate) : -1;
  return {
    name: key,
    id: item[type]?.id,
    start: startDate,
    end: endDate,
    owner: (ltDetails[key] || {}).assignee?.displayName || '',
    status: itemStatus,
    // color: slip > 0 ? Theme.risk : statD?.customStyle?.backgroundColor || '#00bcd4',
    // borderColor: statD?.customStyle?.borderColor || '',
    // borderWidth: statD?.customStyle?.borderWidth || 0,
    issueIcon: item[type]?.fields?.issuetype?.iconUrl,
    completed: {
      amount: slip,
      fill: statD?.customStyle?.backgroundColor || '',
    }
  };
};

export const formatTimelineData = ({ issueData = {}, linkedIssues = [], ltDetails = {} }) => {

  const tl = [{}];
  const parentIssues = linkedIssues.filter((item) => item.inwardIssue?.key);
  const dependentIssues = linkedIssues.filter((item) => item.outwardIssue?.key);
  const statDetails = STATUS_LIST.find((item) => item.wrapperStatuses.includes(issueData?.status.toUpperCase()));
  const parentIds = [];

  if (parentIssues.length) {
    parentIssues.forEach(item => {

      parentIds.push(item?.inwardIssue?.id);
      tl.push(calcItemData(item, ltDetails, 'inwardIssue'));

    });
  }

  const dueDate = issueData?.dueDate ? convertToDate(issueData?.dueDate, true).getTime() : '';
  const startDate = issueData?.startDate ? convertToDate(issueData?.startDate).getTime() : '';
  const isSlipped = isAfter(TODAY, dueDate);
  const endDate = isSlipped ? TODAY : dueDate;
  const slip = isSlipped ? (dueDate - startDate) / (TODAY - startDate) : -1;
  console.log(isSlipped, startDate, TODAY, dueDate, slip)

  tl.push({
    name: issueData?.key,
    id: issueData?.id,
    start: startDate,
    end: endDate,
    owner: issueData?.assignee?.displayName,
    dependency: parentIds,
    status: issueData?.status,
    // color: slip > 0 ? Theme.risk : statDetails?.customStyle?.backgroundColor || '',
    // // color: statDetails?.customStyle ? statDetails?.customStyle?.backgroundColor : '',
    // borderColor: statDetails?.customStyle?.borderColor || '',
    // borderWidth: statDetails?.customStyle?.borderWidth || 0,
    issueIcon: issueData?.issueType?.iconUrl,
    completed: {
      amount: slip,
      fill: statDetails?.customStyle?.backgroundColor || '',
    }
  });

  if (dependentIssues.length) {
    dependentIssues.forEach(item => {

      tl.push({
        ...calcItemData(item, ltDetails, 'outwardIssue'),
        dependency: issueData.id,
      });

    });
  }
  tl.push({});
  console.log('tl - ', tl);
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