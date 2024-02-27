
export const OPEN_STATUSES = ['To Do'];

export const PROGRESS_STATUSES = ['In Progress'];

export const SHORT_DATE_FORMAT = "MMM dd";

export const DAY = 24 * 36e5;
export const TODAY = Date.now();

export const STATUS_LIST = [{
  name: 'Open',
  wrapperStatuses : ['BACKLOG', 'TO DO', 'SELECTED FOR DEVELOPMENT'],
  customStyle: {
    backgroundColor: '#049FD933',
    borderColor: '#049FD9',
    borderWidth: 2,
    borderStyle: 'solid'
  }
},
{
  name: 'In Progress',
  wrapperStatuses : ['IN PROGRESS', 'DEVELOPING', 'DEV COMPLETE', 'SCOPED FOR AC/EC'],
  customStyle: {
    backgroundColor: '#049FD9',
  }
},
{
  name: 'Blocked',
  wrapperStatuses : ['BLOCKED'],
  customStyle: {
    backgroundColor: '#e58a6d',
    
  }
},
{
  name: 'In Review',
  wrapperStatuses : ['IN REVIEW', 'TESTING'],
  customStyle: {
    backgroundColor: '#8bc34a',
    
  }
},
{
  name: 'Completed',
  wrapperStatuses : ['DONE', 'CC READY', 'DUPLICATE_OBSOLETE_CANCELLED', 'CANCELLED', 'FCS', 'ACCEPTED'],
  customStyle: {
    backgroundColor: '#53A828',
    
  }
},
{
  name: 'Overdue',
  wrapperStatuses : [],
  customStyle: {
    backgroundColor: '#DC362E',
    
  }
}];
