import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-summary-excel-download',
  templateUrl: './summary-excel-download.component.html',
  styleUrls: ['./summary-excel-download.component.scss']
})
export class SummaryExcelDownloadComponent implements OnInit {

  @Input() public ExcelData: any


  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
  }

  download()
  {
    let myArray: any[] = [];
      myArray.push(...this.ExcelData.SummaryData)
      const fileToExport = myArray.map((items:any) => {
      return {
      "HTSC": items.HtscCode,
      "Permitted/ Sanctioned demand(KVA)": items.powerlimit,
      "Unit name": items.Plant,
      "C1": this.ExcelData.IsForeCast ? items?.C1_value_EFC:items?.C1_value_ECC,
      "C2": this.ExcelData.IlsForeCast ? items?.C2_value_EFC:items?.C2_value_ECC,
      "C3": this.ExcelData.IsForeCast ? items?.C3_value_EFC:items?.C3_value_ECC,
      "C4": this.ExcelData.IsForeCast ? items?.C4_value_EFC:items?.C4_value_ECC,
      "C5": this.ExcelData.IsForeCast ? items?.C5_value_EFC:items?.C5_value_ECC,
      "C":this.ExcelData.IsForeCast ? items?.C_value_EFC:items?.C_value_ECC,
      }
      });

      console.log(fileToExport)

      this.excelService.exportToExcel(
      fileToExport,
      this.ExcelData.Name
      );

  }

}
