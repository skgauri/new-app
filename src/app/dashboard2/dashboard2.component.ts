import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../orders/order.service';  // Adjust the import path to point to your service
import { Order } from '../orders/order.service';  // Import the Order interface

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {
  orders: Order[] = [];
  orderForm: FormGroup;
  selectedOrder: Order | null = null;  // Explicitly type this as Order or null
  statusFilter = new FormControl('');
  locationFilter = new FormControl('');
  nameFilter = new FormControl('');
  selectedEntries: number = 5;  // Set initial number of rows to 5

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      customer: ['', Validators.required],
      location: ['', Validators.required],
      orderDate: ['', Validators.required],
      status: ['', Validators.required],
      netAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    this.loadOrders();

    this.statusFilter.valueChanges.subscribe(() => this.filterOrders());
    this.locationFilter.valueChanges.subscribe(() => this.filterOrders());
    this.nameFilter.valueChanges.subscribe(() => this.filterOrders());
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data.slice(0, this.selectedEntries);  // Show the default number of rows
    });
  }

  insertOrder(): void {
    this.orderService.addOrder(this.orderForm.value).subscribe(() => {
      this.loadOrders();
      this.orderForm.reset();
    });
  }

  updateOrder(): void {
    if (this.selectedOrder) {
      this.orderService.updateOrder({ ...this.selectedOrder, ...this.orderForm.value }).subscribe(() => {
        this.loadOrders();
        this.selectedOrder = null;
        this.orderForm.reset();
      });
    }
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.loadOrders();
    });
  }

  editOrder(order: Order): void {
    this.selectedOrder = order;
    this.orderForm.patchValue(order);
  }

  filterOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data.filter(order => {
        return (
          (!this.statusFilter.value || order.status === this.statusFilter.value) &&
          (!this.locationFilter.value || order.location.includes(this.locationFilter.value)) &&
          (!this.nameFilter.value || order.customer.toLowerCase().includes(this.nameFilter.value.toLowerCase()))
        );
      }).slice(0, this.selectedEntries);  // Apply the selectedEntries filter
    });
  }

  previousPage(): void {
    // Pagination logic
  }

  nextPage(): void {
    // Pagination logic
  }

  exportToExcel(): void {
    // Excel export logic
  }
}
