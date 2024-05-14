export interface Timesheet {
    id: number;
    userId: number;
    projectId: number;
    uploadedDate: Date;
    totalHours: number;
    timeSheetStatus: string;
    timeSheetRep: string;
    uploadedBy: string;
    linkedDate: Date;
    approvedBy: string;
    approvedDate: Date;
    approvedFromClient: string;
    locationName: string;
    fileName: string;
    isApproved: boolean;
  }