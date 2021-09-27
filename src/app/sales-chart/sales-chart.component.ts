import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { OrderService } from '../order.service';
import { UserRegisterDateService } from '../user-register-date.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements OnInit {

  today = this.userRegisterDate.today();

  yesterday = this.userRegisterDate.yesterday();

  lastThirdDay = this.userRegisterDate.lastThreeDays();

  lastFourthDay = this.userRegisterDate.lastFourDays();

  fiveDays = this.userRegisterDate.fiveDays();

  sevenDays = this.userRegisterDate.sevenDays();

  currentMonth = this.userRegisterDate.currentMonth();

  newYear = this.userRegisterDate.currentYear();

  salesCategory = ["Fruits", "Cookies", "Soft Drinks", "Vegetables", "Dry Fruits", "Spicy Chips", "Vegetable Oils"];

  todayTotalSales = [0,0,0,0,0,0,0];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [ { ticks: {beginAtZero: true}
      }],
    }
  };
  public barChartLabels: Label[] = [this.today.substring(0,10), this.yesterday.substring(0,10), this.lastThirdDay.substring(0,10), this.lastFourthDay.substring(0,10), this.fiveDays.substring(0,10)];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  // public barChartData: any[] = [];
  check:boolean = false;
  public barChartData: any = [{ data: [] }];
  
  constructor(private userRegisterDate : UserRegisterDateService, 
    private orderService : OrderService) 
    {
      console.log("lastFourthDay",this.lastFourthDay);
      console.log("threee",this.lastThirdDay);
    }

  ngOnInit() {
    this.getOrderList();
    console.log("yesterday", this.yesterday.substring(0,10));

  }

  todayTotalSaleReport = 0;
  yesterdayTotalSalesReport = 0;
  threeDaysBeforeSalesReport = 0;
  fourDaysBeforeSalesReport = 0;
  fiveDaysBeforeSalesReport = 0;

  getOrderList() {

    
    this.orderService.deliveredList().then((res: any) => {
      let row = res.records.docs;
      // console.log("data",row);
      
      for (let item of row)
      {

              // ================================today day start============================================

        if(item.deliveredDate.substring(0,10) === this.today.substring(0,10))
        { 
          let todaySales = item.items;     
          // console.log("today Sales",todaySales);

          for(let t of todaySales)
          {
            console.log("t", t.totalPrice);
            this.todayTotalSaleReport += t.totalPrice;
          }
        }


        if(item.deliveredDate.substring(0,10) === this.yesterday.substring(0,10))
        { 
          let yesterDaySales = item.items;     
          // console.log("today Sales",todaySales);

          for(let t of yesterDaySales)
          {
            console.log("y", t.totalPrice);
            this.yesterdayTotalSalesReport += t.totalPrice;
          }
        }

        if(item.deliveredDate.substring(0,10) === this.lastThirdDay.substring(0,10))
        { 
          let threeDaysBeforeSales = item.items;     
          // console.log("today Sales",todaySales);

          for(let t of threeDaysBeforeSales)
          {
            console.log("3", t.totalPrice);
            this.threeDaysBeforeSalesReport += t.totalPrice;
          }
        }

        if(item.deliveredDate.substring(0,10) === this.lastFourthDay.substring(0,10))
        { 
          let fourDaysBeforeSales = item.items;     
          // console.log("today Sales",todaySales);

          for(let t of fourDaysBeforeSales)
          {
            console.log("4", t.totalPrice);
            this.fourDaysBeforeSalesReport += t.totalPrice;
          }
        }

        if(item.deliveredDate.substring(0,10) === this.fiveDays.substring(0,10))
        { 
          let fiveDaysBeforeSales = item.items;     
          // console.log("today Sales",todaySales);

          for(let t of fiveDaysBeforeSales)
          {
            console.log("4", t.totalPrice);
            this.fiveDaysBeforeSalesReport += t.totalPrice;
          }
        }
      }
      console.log("this.todayTotalSaleReport", this.todayTotalSaleReport);
      console.log("this.yesterdayTotalSalesReport", this.yesterdayTotalSalesReport);
      console.log("this.threeDaysBeforeSalesReport", this.threeDaysBeforeSalesReport);
      console.log("this.fourDaysBeforeSalesReport", this.fourDaysBeforeSalesReport);
      console.log("this.fiveDaysBeforeSalesReport", this.fiveDaysBeforeSalesReport);

      this.barChartData = [
        {
          label: 'Sales Report',
          data: [
            this.todayTotalSaleReport,
            this.yesterdayTotalSalesReport,
            this.threeDaysBeforeSalesReport,
            this.fourDaysBeforeSalesReport,
            this.fiveDaysBeforeSalesReport,
          ],
        },
      ];

      this.check = true


// ==============================================












      // for (let item of row)
      // {

      //         // ================================today day start============================================

      //   if(item.deliveredDate.substring(0,10) === this.today.substring(0,10))
      //   { 
      //     // console.log("EEE",item.items);
      //     let todaySales = item.items;     
      //     // console.log("today Sales",todaySales);

      //     // console.log(item.items.category);
      //     for(let i of todaySales)
      //     { 
      //       // console.log("ooooo",i.category);
      //       let index = this.salesCategory.indexOf(i.category)            
      //       // console.log("index", index);
      //       this.todayTotalSales[index]+= i.totalPrice;
      //     }

      

      //   }

      // }for (let item of row)
      // {

   
      //         // ================================today day end============================================
              
              
      //   if(item.deliveredDate.substring(0,10) === this.yesterday.substring(0,10))
      //   { 
      //     // console.log("EEE",item.items);
      //     let todayTotalSales = item.items;     
      //     console.log("yesterdaySales",todayTotalSales);

      //     // console.log(item.items.category);
      //     for(let i of todayTotalSales)
      //     { 
      //       // console.log("ooooo",i.category);
      //       let index = this.salesCategory.indexOf(i.category)            
      //       // console.log("index", index);
      //       this.todayTotalSales[index] += i.totalPrice;
      //     }
      //   }
      // }      



      // console.log("salesCategory", this.salesCategory);
      // console.log("todayTotalSales", this.todayTotalSales);

      // for(let k=0; k < this.todayTotalSales.length; k++)
      // { 
      //   console.log("todayTotalSales", k);

      //   let a = {
      //     data: [this.todayTotalSales[k]], 
      //     label: this.salesCategory[k]
      //   }
      //   this.barChartData.push(a);
      // }
      // console.log("push", this.barChartData);
      // this.check = true

      // this.todayTotalSales = [0,0,0,0,0,0,0];









      
      // console.log("salesCategory", this.salesCategory);
      // console.log("todayTotalSales", this.todayTotalSales);

      // for(let k=0; k < this.todayTotalSales.length; k++)
      // { 
      //   console.log("todayTotalSales", k);

      //   let a = {
      //     data: [this.todayTotalSales[k]], 
      //     label: this.salesCategory[k]
      //   }
      //   this.barChartData.push(a);
      // }
      // console.log("push", this.barChartData);
      // this.check = true
  });

  }
}
