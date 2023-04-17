import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './reportviewer.css'
import logo from '../../../assets/logo.jpg'
import { DataGrid, Pager, Paging } from "devextreme-react/data-grid";
import { reportColumns, reportSummary } from "../../../data/PurchaseOrderData";


export const ReportViewer = () => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([])

  // This Hook is to fetch all orders
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://192.168.1.202:5500/Reports/productsales?fromdate=2023-03-23");
        setHeader(response.data.header)
        setData(response.data.items);
        console.log(header)
      } catch (error) {
        console.log(error)
      }
    };

    getData();
  }, []);

  const pageSizes = [10, 25, 50, 100];

  return (
    <div className='report-div'>
      <div className='report'>
          <div className='report-header'>
            <div className='report-header-info'>
              <p className='report-header-info-user'>{header?.username}</p>
              <p className='report-header-info-date'>{header?.dateGenerated}</p>
            </div>
            <img src={header?.companyInfo?.logoImageUrl} alt='logo' className='report-logo' />
            <h3>{header?.companyInfo?.companyName}</h3>
            <h4>{header?.companyInfo?.companyAddress}</h4>
            <h4>{header?.companyInfo?.companyEmail}</h4>
            <h4>{header?.companyInfo?.companyPhone}</h4>
            <h4>{header?.companyInfo?.companyWebsite}</h4>
            <p className='report-title'>Purchase Orders Report</p>
          </div>
          <div className='report-body'>
            <DataGrid
              dataSource={data}
              // columns={reportColumns}
              style={{ fontSize: '0.7rem', height: '100%', marginLeft: '0.4rem', marginRight: '0.4rem', borderStyle: 'solid' }}
              summary={reportSummary}
              rowAlternationEnabled={true}
            >
              <Paging defaultPageSize={10} />
              <Pager
                showPageSizeSelector={true}
                showInfo={true}
                allowedPageSizes={pageSizes}
              />
            </DataGrid>
          </div>
          <div className='report-footer'>
            <p className='report-footer-brand'>Octop Solutions</p>
            <p className='report-footer-pager'>Page 1 of 1</p>
          </div>
      </div>
    </div>
  )
}
