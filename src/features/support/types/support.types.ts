/**
 * Support Ticket Types
 */

// Ticket Status Enum
export enum TicketStatus {
  New = 0,
  InProgress = 1,
  AwaitingCustomer = 2,
  Resolved = 3,
  Closed = 4,
  Reopened = 5,
}

export interface Ticket {
  id: number;
  name: string;
  email: string;
  messagePreview: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string | null;
  imageCount: number;
  hasAdminNotes: boolean;
}

export interface TicketStatistics {
  periodDays: number;
  periodStats: {
    totalTickets: number;
    newTickets: number;
    awaitingCustomer: number;
    inProgressTickets: number;
    resolvedTickets: number;
    closedTickets: number;
    ticketsWithImages: number;
    averageResponseTime: string;
  };
  dailyBreakdown: Array<{
    date: string;
    count: number;
  }>;
  allTimeTotal: number;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface GetTicketsParams {
  page?: number;
  pageSize?: number;
  status?: TicketStatus | string;
  searchTerm?: string;
  fromDate?: string;
  toDate?: string;
}

export interface GetTicketsResponse {
  status: string;
  data: Ticket[];
  pagination: Pagination;
}

export interface GetStatisticsResponse {
  status: string;
  data: TicketStatistics;
}

export interface UpdateStatusRequest {
  status: TicketStatus;
  notifyCustomer: boolean;
}

export interface UpdateNotesRequest {
  adminNotes: string;
}

export interface RespondToTicketRequest {
  response: string;
  updateStatus: TicketStatus;
}
