import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { RouteGuardService } from '../services/route-guard.service';
import { AdminServiceService } from '../services/admin-service.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNewComponent } from './add-new/add-new.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { AvgFxRateComponent } from './avg-fx-rate/avg-fx-rate.component';
import { SalesdataComponent } from './salesdata/salesdata.component';
import { CSRComponent } from './csr/csr.component';
import { CsragencyComponent } from './csragency/csragency.component';
import { SalesdatarevComponent } from './salesdatarev/salesdatarev.component';
import { SaleDataViewComponent } from './sale-data-view/sale-data-view.component';
import { SavedataconfirmComponent } from './savedataconfirm/savedataconfirm.component';
import { EditsaledataComponent } from './editsaledata/editsaledata.component';
import { LoanComponent } from './loan/loan.component';
import { DividantDistributionComponent } from './dividant-distribution/dividant-distribution.component';
import { ViewsaledatapartComponent } from './viewsaledatapart/viewsaledatapart.component';
import { CnfrmsalesComponent } from './cnfrmsales/cnfrmsales.component';
import { EbitaComponent } from './ebita/ebita.component';
import { EbitComponent } from './ebit/ebit.component';
import { SettingsComponent } from './settings/settings.component';
import { SalesclassificationComponent } from './salesclassification/salesclassification.component';
import { UpdatesaleclassComponent } from './updatesaleclass/updatesaleclass.component';
import { ViewsaleclassComponent } from './viewsaleclass/viewsaleclass.component';
import { DividantDistributionBarGraphComponent } from './dividant-distribution-bar-graph/dividant-distribution-bar-graph.component';
import { DividantDistributionTableFormatComponent } from './dividant-distribution-table-format/dividant-distribution-table-format.component';
import { DasboardviewComponent } from './dasboardview/dasboardview.component';
import { GBPInrComponent } from './gbp-inr/gbp-inr.component';
import { EURInrComponent } from './eur-inr/eur-inr.component';
import { CNYInrComponent } from './cny-inr/cny-inr.component';
import { MarketCapitalizationComponent } from './market-capitalization/market-capitalization.component';
import { PERatioComponent } from './pe-ratio/pe-ratio.component';
import { RevenueSalesComponent } from './revenue-sales/revenue-sales.component';
import { EPSComponent } from './eps/eps.component';
import { DividentPerShareComponent } from './divident-per-share/divident-per-share.component';
import { DividentPayoutRatioComponent } from './divident-payout-ratio/divident-payout-ratio.component';
import { BookvalueComponent } from './bookvalue/bookvalue.component';
import { StateTimingComponent } from './energy/state-timing/state-timing.component';
import { ForecastComponent } from './energy/forecast/forecast.component';
import { ConsumptionComponent } from './energy/consumption/consumption.component';
import { ForecastAdminComponent } from './energy/forecast-admin/forecast-admin.component';
import { ConsumptionAdminComponent } from './energy/consumption-admin/consumption-admin.component';
import { SummaryAdminComponent } from './energy/summary-admin/summary-admin.component';
import { SummaryAdminForecastComponent } from './energy/summary-admin-forecast/summary-admin-forecast.component';
import { ViewSrdDivisionsComponent } from './NewflashSales2024/view-srd-divisions/view-srd-divisions.component';

import { SolarForecastComponent } from './energy/solar-forecast/solar-forecast.component';
import { SolarConsumptionComponent } from './energy/solar-consumption/solar-consumption.component';
import { SolarForecastAdminComponent } from './energy/solar-forecast-admin/solar-forecast-admin.component';
import { SolarConsumptionAdminComponent } from './energy/solar-consumption-admin/solar-consumption-admin.component';
import { SolarSummaryForecastComponent } from './energy/solar-summary-forecast/solar-summary-forecast.component';
import { SolarSummaryConsumptionComponent } from './energy/solar-summary-consumption/solar-summary-consumption.component';

import { DgConsumptionComponent } from './energy/dg-consumption/dg-consumption.component';
import { DgConsumptionAdminComponent } from './energy/dg-consumption-admin/dg-consumption-admin.component';
import { DgSummaryConsumptionComponent } from './energy/dg-summary-consumption/dg-summary-consumption.component';


const routes: Routes = [
  { path: '', component: PagesComponent, canActivate: [RouteGuardService], children: [
    { path: '', redirectTo: 'dashboard'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'view', component: AddNewComponent },
    { path: 'Avgborrow', component: BulkuploadComponent },
    { path: 'AvgFxRate', component: AvgFxRateComponent },
    { path: 'saledata', component: SalesdataComponent },
    { path: 'csr', component: CSRComponent },
    { path: 'csragency', component: CsragencyComponent },
    { path: 'saledatarev', component: SalesdatarevComponent },
    { path: 'saledataview', component: SaleDataViewComponent,canActivate:[AdminServiceService] },
    { path: 'saledatacnfrm', component: SavedataconfirmComponent },
    { path: 'saledataedit', component: EditsaledataComponent },

    { path: 'loan', component: LoanComponent },
    { path: 'divdis', component: DividantDistributionComponent },

    { path: 'divdisbar', component: DividantDistributionBarGraphComponent },
    { path: 'divdistab', component: DividantDistributionTableFormatComponent },

    { path: 'partisaledata', component: ViewsaledatapartComponent },
    { path: 'confsale', component: CnfrmsalesComponent },
    { path: 'ebita', component: EbitaComponent },
    { path: 'ebit', component: EbitComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'Salesclass', component: SalesclassificationComponent },

    { path: 'updatesales', component: UpdatesaleclassComponent },
    { path: 'viewsales', component: ViewsaleclassComponent },
    { path: 'viewsalespart', component: ViewSrdDivisionsComponent },
    { path: 'partisaledata/dasboardview', component: DasboardviewComponent },

    { path: 'gbpinr', component: GBPInrComponent },
    { path: 'eurinr', component: EURInrComponent },
    { path: 'cnyinr', component: CNYInrComponent },

    { path: 'marketcapital', component: MarketCapitalizationComponent },
    { path: 'peratio', component: PERatioComponent },
    { path: 'revenuesales', component: RevenueSalesComponent },

    { path: 'eps', component: EPSComponent },
    { path: 'divpershare', component: DividentPerShareComponent },
    { path: 'divpayout', component: DividentPayoutRatioComponent },
    { path: 'bookvalue', component: BookvalueComponent },

    { path: 'forecast', component: ForecastComponent, data: { title: 'Forecast' } },
    { path: 'consumption', component: ConsumptionComponent, data: { title: 'Forecast' } },
    { path: 'Solarforecast', component: SolarForecastComponent, data: { title: 'Forecast' } },
    { path: 'Solarconsumption', component: SolarConsumptionComponent, data: { title: 'Forecast' } },
    { path: 'forecastadm', component: ForecastAdminComponent,canActivate:[AdminServiceService]},
    { path: 'consumptionadm', component: ConsumptionAdminComponent,canActivate:[AdminServiceService]},
    { path: 'energySummary', component: SummaryAdminComponent,canActivate:[AdminServiceService]},
    { path: 'energySummaryf', component: SummaryAdminForecastComponent,canActivate:[AdminServiceService]},
    { path: 'energytiming', component: StateTimingComponent,canActivate:[AdminServiceService]},
    { path: 'Solarforecastadm', component: SolarForecastAdminComponent,canActivate:[AdminServiceService]},
    { path: 'Solarconsumptionadm', component: SolarConsumptionAdminComponent,canActivate:[AdminServiceService]},
    { path: 'SolarSummaryForecast', component: SolarSummaryForecastComponent,canActivate:[AdminServiceService]},
    { path: 'SolarSummaryConsumption', component: SolarSummaryConsumptionComponent,canActivate:[AdminServiceService]},
    { path: 'DgConsumption', component: DgConsumptionComponent},
    { path: 'DgConsumptionAdmin', component: DgConsumptionAdminComponent,canActivate:[AdminServiceService]},
    { path: 'DgConsumptionSummary', component: DgSummaryConsumptionComponent,canActivate:[AdminServiceService]},
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
