export const bookingColumns = [
  { dataField: "bookingId", caption: "Booking ID", width: 70 },
  {
    dataField: "bookingType",
    caption: "Booking Type",
    width: 90,
  },
  { dataField: "externalSchemeAdmin", width: 100 },
  {
    dataField: "retirementSchemeName",
    caption: "Retirement Scheme Name",
    width: 100,
  },
  { dataField: "courseDate", caption: "Course Date", width: 100 },
  { dataField: "schemePosition", width: 90 },
  { dataField: "trainingVenue", width: 150 },
  { dataField: "paymentMode", width: 150 },
  { dataField: "additionalRequirements", width: 150 },
];

export const bookingRows = [
  {
    id: 1,
    bookingId: 1879,
    bookingRef: "TDPK-2000022",
    idNumber: "89908878",
    fullName: "John Doe",
    email: "johndoe@email.com",
    telephone: "0789909987",
    retirementScheme: "KOKI-KOKI",
    courseCode: "TDPK01",
    courseName: "Truste Development",
    fromDate: "06/02/2023",
    toDate: "09/04/2026",
    approvalStatus: "Draft",
  },

  {
    id: 2,
    bookingId: 1279,
    bookingRef: "TDPK-2000032",
    idNumber: "99088798",
    fullName: "David Doe",
    email: "davedoe@email.com",
    telephone: "0989909987",
    retirementScheme: "KINGSLANDING",
    courseCode: "TDPK04",
    courseName: "Software Engineering",
    fromDate: "06/02/2020",
    toDate: "09/04/2022",
    approvalStatus: "Approved",
  },
];
