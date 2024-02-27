import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highcharts-gantt";
import { ChartWrapper } from './styles';
import { TimelineMock } from '../../utils/mock';
import { StatusTab } from '../StatusTab';
import { DAY, TODAY } from '../../utils/constants';
import { formatTimelineData, getMinMaxDate } from '../../utils/helper';
import { isAfter, isBefore } from 'date-fns';

export const TimelineChart = ({
  issueData,
  linkedIssues,
  ltDetails
}) => {
  const [timelineList, setTimelineList] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (issueData?.id) {
      setTimelineList(formatTimelineData({
        issueData,
        linkedIssues,
        ltDetails
      }));
    }
  }, [linkedIssues, issueData, ltDetails]);


  useEffect(() => {
    if (timelineList?.length) {

    const {min, max} = getMinMaxDate(timelineList);
    

    setOptions({
      tooltip : {
        enabled: false
      },
      chart: {
        plotBorderWidth: 1,
      },
      xAxis: [{
        currentDateIndicator: {
          color: '#748891',
          dashStyle: 'Solid',
          width: 2,
          label: {
            format: ''
          }
        },
        // labels: {
        //   formatter: function () {
        //     return Highcharts.dateFormat("%b %e", this.value);
        //   }
        // },
        dateTimeLabelFormats: {
          day: '%b %e',
        },
        grid: {
          borderWidth: 0
        },
        gridLineWidth: 0,
        // minTickInterval: 24 * 3600 * 1000,
        min: min - 1 * DAY,
        max: max + 1 * DAY,
        custom: {
          TODAY,
          weekendPlotBands: true
        }
      }],
      yAxis: {
        visible: false,
      },
      plotOptions: {
        series: {
          borderRadius: 25,
          connectors: {
            // type: 'fastAvoid',
            lineWidth: 2,
            radius: 2,
            lineColor: '#4693B0',
            startMarker: {
              enabled: true,
              color: '#4693B0',
            },
            endMarker: {
              align: 'top',
              verticalAlign: 'bottom',
            },
          },
          groupPadding: 0,
          dataLabels: [{
            enabled: true,
            // inside: false,
            // align: 'right',
            // verticalAlign: 'middle',
            x: 120,
            // crop: false,
            // overflow: 'allow',
            // position: 'top',
            // formatter: (this) => 
            // y: 50,
            format: `<div style='display:flex;gap:5px'><img style='width: 16px; height:16px; margin-top:3px' src='{point.issueIcon}'></img><div style='display: flex; flex-direction: column'><span style='
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: left;
            '>{point.name}</span><span style='
            font-size: 12px;
            font-weight: 300;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: left;
            color: #6a6969'>{point.owner}</span></div></div>`,
            style: {
              fontWeight: 'normal',
              textOutline: 'none',
              color: '#494A4A',
            },
            useHTML: true,
          }]
        }
      },
      series: [
        {
          name: '',
          type: 'gantt',
          data: timelineList || TimelineMock
        }
      ]
    });
    }
  }, [timelineList]);

  return <ChartWrapper>
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"ganttChart"}
      options={options}
    />
    <StatusTab />
  </ChartWrapper>;
};