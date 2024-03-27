import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highcharts-gantt";
import { ChartWrapper } from './styles';
import { StatusTab } from '../StatusTab';
import { DAY, TODAY } from '../../utils/constants';
import { getMinMaxDate } from '../../utils/helper';
import { differenceInCalendarDays } from 'date-fns';


export const TimelineChart = ({
  timelineList
}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (timelineList?.length) {

      const { min, max } = getMinMaxDate(timelineList);
      const diff = differenceInCalendarDays(max, min) < 10 ? Math.ceil((10 - differenceInCalendarDays(max, min)) / 2) : 4;

      setOptions({
        tooltip: {
          enabled: false
        },
        chart: {
          plotBorderWidth: 1,
        },
        xAxis: [{
          type: 'datetime',
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
          //   },
          //   // step: 1,
          // },
          dateTimeLabelFormats: {
            day: { list: ['%b %e', '%e'] },
          },
          grid: {
            borderWidth: 0
          },
          gridLineWidth: 1,
          minTickInterval: 24 * 3600 * 1000,
          min: min - 2 * DAY,
          max: max + diff * DAY,
          custom: {
            today: TODAY,
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
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
            groupPadding: 0,
            dataLabels: [{
              enabled: true,
              align: 'right',
              verticalAlign: 'middle',
              x: 120,
              format: `<div style='display:flex;gap:5px;min-width:110px;min-height:40px;'><img style='width: 16px; height:16px; margin-top:3px' src='{point.issueIcon}'></img><div style='display: flex; flex-direction: column'><span style='
                  font-size: 14px;
                  font-weight: 500;
                  line-height: 20px;
                  letter-spacing: 0em;
                  text-align: left;
                  color: black;
                  '>{point.name}</span><span style='
                  font-size: 12px;
                  font-weight: 300;
                  line-height: 20px;
                  letter-spacing: 0em;
                  text-align: left;
                  white-space: break-spaces;
                  color: #6a6969'>{point.owner}</span></div></div>`,
              style: {
                fontWeight: 'normal',
                textOutline: 'none',
                color: '#494A4A',
              },
              useHTML: true,
            },
            {
              enabled: true,
              align: 'right',
              format: '{#if point.slippedBy}{point.slippedBy}{/if}',
              padding: 10,
              style: {
                fontWeight: 'normal',
                textOutline: 'none',
              }
            }]
          }
        },
        series: [
          {
            name: '',
            type: 'gantt',
            data: timelineList
          }
        ]
      }
      );

      Highcharts.addEvent(Highcharts.Axis, 'foundExtremes', e => {
        if (e.target.options.custom && e.target.options.custom.weekendPlotBands) {

          const axis = e.target,
            chart = axis.chart,
            day = 24 * 36e5,
            isWeekend = t => /[06]/.test(chart.time.dateFormat('%w', t)),
            plotBands = [];

          let inWeekend = false;

          for (
            let x = Math.floor(axis.min / day) * day;
            x <= Math.ceil(axis.max / day) * day;
            x += day
          ) {
            const last = plotBands.at(-1);
            if (isWeekend(x) && !inWeekend) {
              plotBands.push({
                from: x,
                color: '#dedada'
              });
              inWeekend = true;
            }

            if (!isWeekend(x) && inWeekend && last) {
              last.to = x;
              inWeekend = false;
            }
          }
          axis.options.plotBands = plotBands;
        }
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