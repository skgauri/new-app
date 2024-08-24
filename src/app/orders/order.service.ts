import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';  // Import 'of' from 'rxjs'
import { catchError } from 'rxjs/operators';

// Define the Order interface
export interface Order {
  id?: number;
  customer: string;
  location: string;
  orderDate: string;
  status: string;
  netAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://your-api-endpoint.com/orders';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Get all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError<Order[]>('getOrders', []))
    );
  }

  // Add a new order
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  // Update an existing order
  updateOrder(order: Order): Observable<any> {
    if (order.id === undefined) {
      throw new Error('Order ID is required for update');
    }
    const url = `${this.apiUrl}/${order.id}`;
    return this.http.put(url, order).pipe(
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  // Delete an order by ID
  deleteOrder(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deleteOrder'))
    );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);  // Use 'of' here
    };
  }
}
