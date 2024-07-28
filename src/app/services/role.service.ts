import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


public panelList: any = {
  dashboard: {
    name: 'Home',
    icon: 'home',
    routeUrl: 'dashboard'
    },
    SalesDataAdd: {
      name: 'Add Flash Sales',
      icon: 'note_add',
      routeUrl: 'saledatarev'
    },
    SalesDataUpload: {
      name: 'Sales File Upload',
      icon: 'open_in_browser',
      routeUrl: 'saledata'
    },
    View: {
      name: 'View SRD',
      icon: 'remove_red_eye',
      routeUrl: 'view'
    },

    PlantsSaleData: {
      name: 'Update SRD',
      icon: 'table_chart',
      routeUrl: 'saledataview'
    },
    PartPlantsSaleData: {
      name: 'Add Flash Sales',
      icon: 'note_add',
      routeUrl: 'partisaledata'
    },
    ViewPartPlantsSaleData: {
      name: 'View SRD',
      icon: 'remove_red_eye',
      routeUrl: 'viewsalespart'
    },
    Salesclass: {
      name: 'Add Sales Classification',
      icon: 'note_add',
      routeUrl: 'Salesclass'
    },
    ViewDynamic: {
      name: 'Particular Sales Data',
      icon: 'remove_red_eye',
      routeUrl: 'saledataview'
    },

    Averageborrow: {
      name: 'Average Borrowing',
      icon: 'assessment',
      routeUrl: 'Avgborrow'
    },
    CSR: {
      name: 'CSR',
      icon: 'assessment',
      routeUrl: 'csr'
    },

    CSRagency: {
      name: 'CSR Agency',
      icon: 'assessment',
      routeUrl: 'csragency'
    },
    Loan: {
      name: 'Loan',
      icon: 'assessment',
      routeUrl: 'loan'
    },
    DividantDistribution: {
      name: 'Dividend Distribution',
      icon: 'assessment',
      routeUrl: 'divdis'
    },
    AverageFXRate: {
      name: 'Average FX Rate',
      icon: 'assessment',
      routeUrl: 'AvgFxRate'
    },
    Ebita: {
      name: 'Ebitda',
      icon: 'assessment',
      routeUrl: 'ebita'
    },
    Ebit: {
      name: 'Ebit',
      icon: 'assessment',
      routeUrl: 'ebit'
    },
    DataMaster: {
      name: 'Dividend Distribution',
      icon: 'assessment',
      submenu: [
        {
          name: 'Bar Graph',
          routeUrl: 'divdisbar',
        },
        {
          name: 'Table Format',
          routeUrl: 'divdistab'
        },

      ]
    },
    Settings: {
      name: 'Settings',
      icon: 'settings',
      routeUrl: 'settings',
    },
    Updatesales: {
      name: 'Update Sales Classification',
      icon: 'table_chart',
      routeUrl: 'updatesales',
    },
    Viewsales: {
      name: 'View Sales Classification',
      icon: 'remove_red_eye',
      routeUrl: 'viewsales',
    },
    GBPINR: {
      name: 'GBP-INR',
      icon: 'monetization_on',
      routeUrl: 'gbpinr',
    },
    EURINR: {
      name: 'EUR-INR',
      icon: 'monetization_on',
      routeUrl: 'eurinr',
    },
    CNYINR: {
      name: 'CNY-INR',
      icon: 'monetization_on',
      routeUrl: 'cnyinr',
    },

     Marketcap: {
      name: 'Market-Capitalization',
      icon: 'assessment',
      routeUrl: 'marketcapital',
    },
    PRRatio: {
      name: 'PE-Ratio',
      icon: 'assessment',
      routeUrl: 'peratio',
    },
    revenuesales: {
      name: 'Revenue-Sales',
      icon: 'assessment',
      routeUrl: 'revenuesales',
    },
     EPS: {
      name: 'EPS',
      icon: 'assessment',
      routeUrl: 'eps',
    },
    DividentPerShare: {
      name: 'Divident Per Share',
      icon: 'assessment',
      routeUrl: 'divpershare',
    },
    DividentPayoutRatio: {
      name: 'Divident Payout',
      icon: 'assessment',
      routeUrl: 'divpayout',
    },
    BookAndMarketShare: {
      name: 'Book And Market Share',
      icon: 'assessment',
      routeUrl: 'bookvalue',
    },
    EnergyUser:{
      name: 'Electrical Energy',
      icon: 'assessment',
      submenu:[
        {
          name: 'Energy Forecast',
          routeUrl: 'forecast',
        },
        {
          name: 'Energy Consumption',
          routeUrl: 'consumption'
        },
      ]
    },
    EnergyAdmin:{
      name: 'Electrical Energy',
      icon: 'assessment',
      submenu:[
        {
          name: 'Energy Forecast',
          routeUrl: 'forecastadm',
        },
        {
          name: 'Energy Consumption',
          routeUrl: 'consumptionadm'
        },
      ]
    },
    SolarUser:{
      name: 'Solar Energy',
      icon: 'assessment',
      submenu:[
        {
          name:'Solar Forecast',
          routeUrl: 'Solarforecast',
        },
        {
          name:'Solar Consumption',
          routeUrl: 'Solarconsumption',
        },
      ]
    },
    SolarAdmin:{
      name: 'Solar Energy',
      icon: 'assessment',
      submenu:[
        {
          name:'Solar Forecast',
          routeUrl: 'Solarforecastadm',
        },
        {
          name:'Solar Consumption',
          routeUrl: 'Solarconsumptionadm',
        },
      ]
    },
    Energy_Summary:{
      name: 'Energy Summary',
      icon: 'data_usage',
      submenu:[
        {
          name:'Forecast',
          routeUrl: 'energySummaryf',
        },
        {
          name:'Consumption',
          routeUrl: 'energySummary',
        },
      ]
    },
    Solar_Summary:{
      name: 'Solar Summary',
      icon: 'data_usage',
      submenu:[
        {
          name:'Forecast',
          routeUrl: 'SolarSummaryForecast',
        },
        {
          name:'Consumption',
          routeUrl: 'SolarSummaryConsumption',
        },
      ]
    },
    DG_User:{
      name: 'DG Energy',
      icon: 'assessment',
      submenu:[
        {
          name:'DG Consumption',
          routeUrl: 'DgConsumption',
        },
      ]
    },
    DG_Admin:{
      name: 'DG Energy',
      icon: 'assessment',
      submenu:[
        {
          name:'DG Consumption',
          routeUrl: 'DgConsumptionAdmin',
        },
      ]
    },

    DG_Summary:{
      name: 'DG Summary',
      icon: 'data_usage',
      submenu:[
        {
          name:'DG Consumption',
          routeUrl: 'DgConsumptionSummary',
        }
      ]
    },
    statetiming: {
      name: 'State time',
      icon: 'access_time',
      routeUrl: 'energytiming',
    },


  };

  userRole: any = {
    Sales: [
      this.panelList.dashboard,
      this.panelList.PartPlantsSaleData,
      // this.panelList.Salesclass,
      // this.panelList.ViewPartPlantsSaleData,
      this.panelList.Settings,
      ],

    SalesCorp: [
       this.panelList.dashboard,
       this.panelList.PlantsSaleData,
       this.panelList.View,
        // this.panelList.Updatesales,
        // this.panelList.Viewsales,
       this.panelList.Settings,
        ],
    treasurer: [
      this.panelList.dashboard,
        this.panelList.Averageborrow,
        this.panelList.AverageFXRate,
        this.panelList.CSR,
        this.panelList.CSRagency,
        this.panelList.GBPINR,
        this.panelList.EURINR,
        this.panelList.CNYINR,

        this.panelList.EPS,
        // this.panelList.DividentPerShare,
        // this.panelList.DividentPayoutRatio,

        this.panelList.Marketcap,
        this.panelList.PRRatio,
        // this.panelList.revenuesales,

        this.panelList.BookAndMarketShare,

        this.panelList.Loan,
        this.panelList.DataMaster,
        this.panelList.Settings,
        ],
    finance:
    [
      this.panelList.dashboard,
      this.panelList.Ebita,
      this.panelList.Ebit,
      this.panelList.Forecast,
      this.panelList.Consumption,
      this.panelList.Settings,
    ],
    energy:
    [
      this.panelList.dashboard,
      this.panelList.EnergyUser,
      this.panelList.SolarUser,
      this.panelList.DG_User,
      this.panelList.Settings,
    ],
    energyadmin:
    [
      this.panelList.dashboard,
      this.panelList.EnergyAdmin,
      this.panelList.SolarAdmin,
      this.panelList.DG_Admin,
      this.panelList.Energy_Summary,
      this.panelList.Solar_Summary,

      this.panelList.DG_Summary,
      this.panelList.statetiming,
      this.panelList.Settings,
    ]

  };


  constructor() { }

}
