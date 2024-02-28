import styled from 'styled-components';

export const Theme = {
  neutral: 'grey',
  risk: '#DC362E',
  success: '#52c41a',
  moderate: 'rgba(217, 178, 22, 1)',
  default: '#00bcd4'
}; 

export const Wrapper = styled.div`
display: flex;
padding: 10px;
font-family: sans-serif;
flex-direction: column;
gap: 20px;
label {
  margin-right: 10px;
  font-size: 15px;
}
div {
  // display: flex;
}
`;

export const  DurationSection = styled.div`
justify-content: flex-start;
display: flex;
width: 100%;
`;

export const DaysRow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DetailsSection = styled.div`
display: flex;
gap: 15px;
span {
  font-weight: bold;
  font-size: 15px;
}
`;

export const DependencySection = styled.div`
padding: 20px 12px;
border: 1px solid #e1e1e1;
border-radius: 5px;
flex-direction: column;
gap: 15px;
  label {
    font-weight: bold;
  }
`;

export const ChartLoading = styled.div`
  margin: 30px;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;