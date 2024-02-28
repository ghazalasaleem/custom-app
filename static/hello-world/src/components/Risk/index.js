import React, { useEffect, useState } from 'react';

import { differenceInCalendarDays } from 'date-fns';
import { Theme } from '../../styles';
import { CLOSED_STATUS, OPEN_STATUSES, TODAY } from '../../utils/constants';
import styled from 'styled-components';
import { Progress } from 'antd';

export const RiskSection = styled.div`
display: flex;
width: 300px;
label {
  white-space: nowrap;
}
`;

export const RiskSec = ({ data, current }) => {

  const [riskData, setRiskData] = useState({});

  useEffect(() => {
    if (data?.startDate) {
      setRiskData(calculateRisk());
    }
  }, [data, current]);

  const calculateRisk = () => {
    const riskDetails = {
      color: Theme.neutral,
      status: ''
    };

    if (current?.slip > 0 && !CLOSED_STATUS.includes(data?.status.toUpperCase())) {
      riskDetails.color = Theme.risk;
      riskDetails.status = 'High';
    } else {
      if (!CLOSED_STATUS.includes(data?.status.toUpperCase())) {
        const dueDateDifference = differenceInCalendarDays(data.dueDate, TODAY);
        const duration = differenceInCalendarDays(data.dueDate, data.startDate);

        if (dueDateDifference < 0) {
          riskDetails.color = Theme.risk;
          riskDetails.status = 'High';
        }
        else {
          if (duration <= dueDateDifference) {
            riskDetails.color = Theme.success;
            riskDetails.status = 'Low';
          } else if (OPEN_STATUSES.includes(data.status.toUpperCase())) {
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