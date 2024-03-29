import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { addBusinessDays, addDays, differenceInBusinessDays, differenceInCalendarDays, format, isAfter } from 'date-fns';
import { CLOSED_STATUS, OPEN_STATUSES, PROGRESS_STATUSES, SHORT_DATE_FORMAT, TODAY } from '../../utils/constants';
import { Theme } from '../../styles';

export const DaySec = styled.div`
  width: calc(100% - 8px);
  height: 5px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    margin: 5px 20px;
  }
  span:first-child {
    margin-left: 0px;
  }
`;

export const DayWrapper = styled.div`
  display: flex;
  width: 16%;
  align-items: center;
  
`;

export const SeperatorDot = styled.div`
  border: 1px solid white;
  width: 6px;
  height: 6px;
  border-radius: 25px;
  background: grey;
`;
const today = new Date();
export const DaysChart = ({ data }) => {

  const {
    startDate,
    dueDate,
    status
  } = data;

  const [series, setSeries] = useState([]);
  const slipDate = isAfter(TODAY, dueDate) ? TODAY : dueDate;

  useEffect(() => {
    if (startDate && dueDate && isAfter(dueDate, startDate)) {
      calcSeries();
    }
  }, [data]);

  const getStyles = (thisDay, i, diff, dueDate) => {

    const cusStyle = {
      backgroundColor: Theme.neutral
    };

    const bufferDay = differenceInCalendarDays(dueDate, thisDay);

    if (isAfter(TODAY, thisDay)) {
      if (bufferDay < 0 && !CLOSED_STATUS.includes(status.toUpperCase())) {
        cusStyle.backgroundColor = Theme.risk;
      }
      if (bufferDay > -1 && OPEN_STATUSES.includes(status.toUpperCase())) {
        cusStyle.backgroundColor = Theme.moderate;
      }
      if (bufferDay > -1 && PROGRESS_STATUSES.includes(status.toUpperCase())) {
        cusStyle.backgroundColor = Theme.success;
      }
    }

    if (i == 0 && i == diff - 1) {
      cusStyle.borderRadius = '25px';
    }
    else if (i == 0) {
      cusStyle.borderRadius = '25px 0px 0px 25px';
    }
    else if (i == diff - 1) {
      cusStyle.borderRadius = '0px 25px 25px 0px';
    }
    else {
      cusStyle.borderRadius = '0px';
    }
    return cusStyle;
  };

  const calcSeries = () => {
    const diff = differenceInBusinessDays(slipDate, startDate);
    const dayDifference = [];
    if (diff) {
      const count = diff > 8 ? Math.ceil(diff/8) : 1;
      for (let i = 0; i < diff; i=i+count) {

        const thisDay = addBusinessDays(startDate, i + count);

        dayDifference.push({
          date: format(thisDay, SHORT_DATE_FORMAT),
          customStyle: getStyles(thisDay, i, diff, dueDate)
        })
      }
    }
    setSeries(dayDifference);
  };

  if (!startDate || !dueDate) {
    return null;
  }

  return <Wrapper>
    <span>{format(startDate, SHORT_DATE_FORMAT)}</span>
    {
      series.map((item, index) => {
        return (
          <DayWrapper className='tab' key={`day-wrapper-${index}`}>
            <DaySec className='path' style={item.customStyle}></DaySec>
            {index < series.length - 1 && (
              <Tooltip placement="top" title={item.date} >
                <SeperatorDot />
              </Tooltip>
            )}
          </DayWrapper>
        );
      })
    }
    <span>{format(slipDate, SHORT_DATE_FORMAT)}</span>
  </Wrapper>
};