import React, { useEffect, useState } from 'react';

import { differenceInCalendarDays } from 'date-fns';
import { Theme } from '../../styles';
import { OPEN_STATUSES } from '../../utils/constants';
import styled from 'styled-components';
import { Progress } from 'antd';

const today = new Date();
export const RiskSection = styled.div`
display: flex;
width: 300px;
label {
  white-space: nowrap;
}
`;

export const RiskSec = ({ data }) => {

  const [riskData, setRiskData] = useState({});

  useEffect(() => {
    if (data?.startDate) {
      setRiskData(calculateRisk());
    }
  }, [data]);

  const calculateRisk = () => {
    const riskDetails = {
      color: Theme.neutral,
      status: ''
    };
    const dueDateDifference = differenceInCalendarDays(data.dueDate, today);
    const duration = differenceInCalendarDays(data.dueDate, data.startDate);

    if (dueDateDifference < 0) {
      riskDetails.color = Theme.risk;
      riskDetails.status = 'High';
    }
    else {
      if (duration <= dueDateDifference) {
        riskDetails.color = Theme.success;
        riskDetails.status = 'Low';
      } else if (OPEN_STATUSES.includes(data.status)) {
        if (duration - dueDateDifference > 1) {
          riskDetails.color = Theme.risk;
          riskDetails.status = 'High';
        }
        else {
          riskDetails.color = Theme.moderate;
          riskDetails.status = 'Slight';
        }
      }
      else {
        riskDetails.color = Theme.success;
        riskDetails.status = 'Low';
      }
    }
    return riskDetails;
  };

  return (<RiskSection>
    <label>Risk Level : </label>
    <Progress percent={100} showInfo={false} strokeColor={riskData.color} /> {riskData.status}
  </RiskSection>);
};