import { TelerikReportViewer } from '@progress/telerik-react-report-viewer'

export const ReportViewer = () => {
  let viewer;

  return (
    <div className='report-div'>
      <TelerikReportViewer
        ref={ el => viewer = el }
        reportServer={{
            url: 'http://localhost:59655/',
            // username: 'myusername',
            // password: 'mypass'
        }}
        reportSource={{
            report: 'firstreport.trdp',
            parameters: {}
        }}
        viewerContainerStyle = {{
            width: '1000px',
            height: '650px',
            alignSelf: 'center'

        }}
      />
    </div>
  )
}


