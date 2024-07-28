import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadersComponent } from './headers/headers.component';
import { DatePipe } from '@angular/common';

//Angular Materials
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesdatarevComponent } from './salesdatarev/salesdatarev.component';
import { SaleDataViewComponent } from './sale-data-view/sale-data-view.component';
//Pages
import { AddNewComponent } from './add-new/add-new.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';
import { AvgFxRateComponent } from './avg-fx-rate/avg-fx-rate.component';
import { SalesdataComponent } from './salesdata/salesdata.component';
import { CSRComponent } from './csr/csr.component';
import { SavedataconfirmComponent } from './savedataconfirm/savedataconfirm.component';

import {NgxPaginationModule} from 'ngx-pagination';


import { EditsaledataComponent } from './editsaledata/editsaledata.component';
import { LoanComponent } from './loan/loan.component';
import { DividantDistributionComponent } from './dividant-distribution/dividant-distribution.component';
import { ViewsaledatapartComponent } from './viewsaledatapart/viewsaledatapart.component';
import { CnfrmsalesComponent } from './cnfrmsales/cnfrmsales.component';
import { CsragencyComponent } from './csragency/csragency.component';
import { EbitaComponent } from './ebita/ebita.component';
import { EbitComponent } from './ebit/ebit.component';
import { SettingsComponent } from './settings/settings.component';
import { SalesclassificationComponent } from './salesclassification/salesclassification.component';
import { UpdatesaleclassComponent } from './updatesaleclass/updatesaleclass.component';
import { ViewsaleclassComponent } from './viewsaleclass/viewsaleclass.component';
import { DasboardviewComponent } from './dasboardview/dasboardview.component';
import { DividantDistributionBarGraphComponent } from './dividant-distribution-bar-graph/dividant-distribution-bar-graph.component';
import { DividantDistributionTableFormatComponent } from './dividant-distribution-table-format/dividant-distribution-table-format.component';
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
import { ForecastComponent } from './energy/forecast/forecast.component';
import { ConsumptionComponent } from './energy/consumption/consumption.component';
import { HttpClientModule } from '@angular/common/http';
import { BarchartComponent } from './dashboard/barchart/barchart.component';

import { ConsumptionAdminComponent } from './energy/consumption-admin/consumption-admin.component';
import { ForecastAdminComponent } from './energy/forecast-admin/forecast-admin.component';
import { FTMPopupComponent } from './NewflashSales2024/ftm-popup/ftm-popup.component';
import { YTMPopupComponent } from './NewflashSales2024/ytm-popup/ytm-popup.component';
import { ViewSrdDivisionsComponent } from './NewflashSales2024/view-srd-divisions/view-srd-divisions.component';
import { StateTimingComponent } from './energy/state-timing/state-timing.component';
import { ViewFtmYtmAdminComponent } from './NewflashSales2024/view-ftm-ytm-admin/view-ftm-ytm-admin.component';
import { SummaryAdminComponent } from './energy/summary-admin/summary-admin.component';
import { SummaryAdminForecastComponent } from './energy/summary-admin-forecast/summary-admin-forecast.component';
import { SolarForecastComponent } from './energy/solar-forecast/solar-forecast.component';
import { SolarConsumptionComponent } from './energy/solar-consumption/solar-consumption.component';
import { SolarForecastAdminComponent } from './energy/solar-forecast-admin/solar-forecast-admin.component';
import { SolarConsumptionAdminComponent } from './energy/solar-consumption-admin/solar-consumption-admin.component';
import { SolarSummaryForecastComponent } from './energy/solar-summary-forecast/solar-summary-forecast.component';
import { SolarSummaryConsumptionComponent } from './energy/solar-summary-consumption/solar-summary-consumption.component';
import { DgConsumptionComponent } from './energy/dg-consumption/dg-consumption.component';
import { DgConsumptionAdminComponent } from './energy/dg-consumption-admin/dg-consumption-admin.component';
import { DgSummaryConsumptionComponent } from './energy/dg-summary-consumption/dg-summary-consumption.component';
import { SummaryExcelDownloadComponent } from './energy/summary-excel-download/summary-excel-download.component';
import { SummaryFiltersComponent } from './energy/components/summary-filters/summary-filters.component';









@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    HeadersComponent,
    AddNewComponent,
    BulkuploadComponent,
    AvgFxRateComponent,
    SalesdataComponent,
    CSRComponent,
    SalesdatarevComponent,
    SaleDataViewComponent,
    SavedataconfirmComponent,
    EditsaledataComponent,
    LoanComponent,
    DividantDistributionComponent,
    ViewsaledatapartComponent,
    CnfrmsalesComponent,
    CsragencyComponent,
    EbitaComponent,
    EbitComponent,
    SettingsComponent,
    SalesclassificationComponent,
    UpdatesaleclassComponent,
    ViewsaleclassComponent,
    DasboardviewComponent,
    DividantDistributionBarGraphComponent,
    DividantDistributionTableFormatComponent,
    GBPInrComponent,
    EURInrComponent,
    CNYInrComponent,
    MarketCapitalizationComponent,
    PERatioComponent,
    RevenueSalesComponent,
    EPSComponent,
    DividentPerShareComponent,
    DividentPayoutRatioComponent,
    BookvalueComponent,
    ForecastComponent,
    ConsumptionComponent,
    BarchartComponent,

    ConsumptionAdminComponent,
    ForecastAdminComponent,
    FTMPopupComponent,
    YTMPopupComponent,
    ViewSrdDivisionsComponent,
    StateTimingComponent,
    ViewFtmYtmAdminComponent,
    SummaryAdminComponent,
    SummaryAdminForecastComponent,
    SolarForecastComponent,
    SolarConsumptionComponent,
    SolarForecastAdminComponent,
    SolarConsumptionAdminComponent,
    SolarSummaryForecastComponent,
    SolarSummaryConsumptionComponent,
    DgConsumptionComponent,
    DgConsumptionAdminComponent,
    DgSummaryConsumptionComponent,
    SummaryExcelDownloadComponent,
    SummaryFiltersComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
  providers: [DatePipe]
})
export class PagesModule { }
