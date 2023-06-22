import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { homeMenuSource } from "../../../data/menu";
import Portal from "../../../components/dashboard/Portal";
import New from "../../../components/dashboard/New";
import { bookingColumns } from "../../../data/PurchaseOrderData";
import { bookingFilterValues } from "../../../helpers/datatableSource";
import ConfirmationPopupComponent from "../../../components/dashboard/ConfirmationPopupComponent";
import OnboardingService from "../../../axios/onboardingRequest";
import CategoryComponent from "../../../components/dashboard/CategoryComponent";
import { useNavigate } from "react-router";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [singleBooking, setSingleBooking] = useState({});
  const [onRowDblClickBookingId, setRowDblClickBookingId] = useState(null);
  const [onRowClickItem, setRowClickItem] = useState(null);
  // eslint-disable-next-line
  const [date, setDate] = useState("");
  const [statusMode, setStatusMode] = useState("");
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setRowDblClickBookingId(null);
    setSingleBooking({});
    setStatusMode("");
    setOpen(false);
  };

  const startEdit = ({ data }) => {
    if (data) {
      setRowDblClickBookingId(data.bookingId);
    } else {
      setRowDblClickBookingId(null);
    }
  };

  const handleRedirect = (id) => {
    navigate(`/dashboard/bookings/${id}/view`);

  };

  useEffect(() => {
    try {
      const getData = async () => {
        // const response vice.Request.getByDate(date.startdate, date.enddate)
        //   : await webService.Request.get();
        const url = "/test";
        const response = await OnboardingService.get(url);
        setBookings(response);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    const getSingleBooking = async () => {
      // const response = await webService.Request.getById(onRowDblClickBookingId);
      const url = "/test/" + onRowDblClickBookingId;
      const response = await OnboardingService.get(url);
      setSingleBooking(response);
      navigate(`/dashboard/bookings/${response?.bookingId}/view`);

      setOpen((isOpen) => !isOpen);
    };
    if (onRowDblClickBookingId) getSingleBooking();
  }, [onRowDblClickBookingId, navigate]);

  const openConfirmationPopup = async (rowItem) => {
    if (rowItem === null) {
      toast.warning("Please select a booking to delete");
    } else {
      setStatusMode("DeleteMode");
      setOpen((isOpen) => !isOpen);
    }
  };

  const handleClick = (menu) => {
    switch (menu) {
      case "Find":
        // fromDate === null && toDate && date === ""
        //   ? setDate({ startdate: fromDate, enddate: toDate })
        //   : setDate({ startdate: fromDate, enddate: toDate });
        break;
      case "New":
        setStatusMode("CreateMode");
        setOpen((isOpen) => !isOpen);
        break;
      case "Delete":
        openConfirmationPopup(onRowClickItem);
        break;
      case "Close":
        console.log("Close was clicked");
        break;
      case "Help":
        console.log("Help was clicked");
        break;

      default:
        break;
    }
  };

  return (
    <main className="w-full min-h-full relative  px-3 md:px-5 py-1.5">
      <section>
        <CategoryComponent
          menus={homeMenuSource}
          heading={"Booking List"}
          company={"ARBS Customer Portal"}
          onMenuClick={handleClick}
          handleRedirect={handleRedirect}
          data={bookingDemo}
          keyExpr={"bookingId"}
          columns={bookingColumns}
          startEdit={startEdit}
          setRowClickItem={setRowClickItem}
          openConfirmationPopup={openConfirmationPopup}
          filterValues={bookingFilterValues}
        />
      </section>

      {statusMode === "CreateMode" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            bookings={bookings}
            singleBooking={singleBooking}
            setBookings={setBookings}
            handleClose={handleClose}
            title={"Create New Booking"}
            heading={"Booking Item Management"}
            statusBarText={"New Booking Item"}
            statusMode={statusMode}
          />
        </Portal>
      ) : statusMode === "EditMode" ? (
        <Portal isOpen={isOpen} setOpen={setOpen}>
          <New
            singleBooking={singleBooking}
            setSingleBooking={setSingleBooking}
            handleClose={handleClose}
            title={"Update A Booking Item"}
            heading={"Booking Item Management"}
            statusBarText={"Updating Booking Item"}
            statusMode={statusMode}
          />
        </Portal>
      ) : (
        statusMode === "DeleteMode" && (
          <Portal isOpen={isOpen} setOpen={setOpen}>
            <ConfirmationPopupComponent
              item={onRowClickItem}
              bookings={bookings}
              setBookings={setBookings}
              handleClose={handleClose}
              title={"Delete A Booking Item"}
              statusBarText={"Delete Booking Item"}
              statusMode={statusMode}
            />
          </Portal>
        )
      )}
    </main>
  );
};

export default Booking;


const bookingDemo = [{
  "bookingId": "4248",
  "bookingType": "Industrial",
  "externalSchemeAdmin": "Webster Heelis",
  "retirementSchemeName": "Interstate Power and Light Company",
  "schemePosition": "n/a",
  "trainingVenue": "France"
}, {
  "bookingId": "2",
  "bookingType": "Home",
  "externalSchemeAdmin": "Cairistiona Joska",
  "retirementSchemeName": "Perrigo Company",
  "schemePosition": "Major Pharmaceuticals",
  "trainingVenue": "China"
}, {
  "bookingId": "93403",
  "bookingType": "Clothing",
  "externalSchemeAdmin": "Maxy Episcopio",
  "retirementSchemeName": "Quanta Services, Inc.",
  "schemePosition": "Engineering & Construction",
  "trainingVenue": "Argentina"
}, {
  "bookingId": "631",
  "bookingType": "Games",
  "externalSchemeAdmin": "Sherrie Statham",
  "retirementSchemeName": "Trinity Biotech plc",
  "schemePosition": "Biotechnology: In Vitro & In Vivo Diagnostic Substances",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "44728",
  "bookingType": "Tools",
  "externalSchemeAdmin": "Dianne Noads",
  "retirementSchemeName": "SB Financial Group, Inc.",
  "schemePosition": "Major Banks",
  "trainingVenue": "Chile"
}, {
  "bookingId": "575",
  "bookingType": "Kids",
  "externalSchemeAdmin": "Fran Folca",
  "retirementSchemeName": "Advanced Semiconductor Engineering, Inc.",
  "schemePosition": "Semiconductors",
  "trainingVenue": "France"
}, {
  "bookingId": "0788",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Venus De Pietri",
  "retirementSchemeName": "Lawson Products, Inc.",
  "schemePosition": "Industrial Specialties",
  "trainingVenue": "Albania"
}, {
  "bookingId": "5950",
  "bookingType": "Computers",
  "externalSchemeAdmin": "Nickolaus Zannolli",
  "retirementSchemeName": "Oxford Immunotec Global PLC",
  "schemePosition": "Biotechnology: In Vitro & In Vivo Diagnostic Substances",
  "trainingVenue": "Sudan"
}, {
  "bookingId": "0126",
  "bookingType": "Tools",
  "externalSchemeAdmin": "Gustave Kesten",
  "retirementSchemeName": "S&T Bancorp, Inc.",
  "schemePosition": "Major Banks",
  "trainingVenue": "United States"
}, {
  "bookingId": "6",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Denny Wohler",
  "retirementSchemeName": "Regency Centers Corporation",
  "schemePosition": "n/a",
  "trainingVenue": "Russia"
}, {
  "bookingId": "4",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Kenton Yakolev",
  "retirementSchemeName": "Virtus Global Dividend & Income Fund Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "5",
  "bookingType": "Books",
  "externalSchemeAdmin": "Rosella Landman",
  "retirementSchemeName": "Winnebago Industries, Inc.",
  "schemePosition": "Homebuilding",
  "trainingVenue": "Nigeria"
}, {
  "bookingId": "997",
  "bookingType": "Movies",
  "externalSchemeAdmin": "Molly Rennocks",
  "retirementSchemeName": "CME Group Inc.",
  "schemePosition": "Investment Bankers/Brokers/Service",
  "trainingVenue": "Colombia"
}, {
  "bookingId": "69",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Kenna Wasmuth",
  "retirementSchemeName": "Soligenix, Inc.",
  "schemePosition": "Major Pharmaceuticals",
  "trainingVenue": "Sweden"
}, {
  "bookingId": "7568",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Rupert Povall",
  "retirementSchemeName": "WNS (Holdings) Limited",
  "schemePosition": "Business Services",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "78199",
  "bookingType": "Clothing",
  "externalSchemeAdmin": "Ellary Redrup",
  "retirementSchemeName": "KapStone Paper and Packaging Corporation",
  "schemePosition": "Paper",
  "trainingVenue": "Russia"
}, {
  "bookingId": "0878",
  "bookingType": "Games",
  "externalSchemeAdmin": "Frieda Lob",
  "retirementSchemeName": "OSI Systems, Inc.",
  "schemePosition": "Semiconductors",
  "trainingVenue": "China"
}, {
  "bookingId": "81",
  "bookingType": "Books",
  "externalSchemeAdmin": "Glenine Carss",
  "retirementSchemeName": "AllianzGI Convertible & Income Fund II",
  "schemePosition": "n/a",
  "trainingVenue": "Portugal"
}, {
  "bookingId": "99342",
  "bookingType": "Health",
  "externalSchemeAdmin": "Emanuel Jarratt",
  "retirementSchemeName": "Lonestar Resources US Inc.",
  "schemePosition": "Oil & Gas Production",
  "trainingVenue": "Philippines"
}, {
  "bookingId": "455",
  "bookingType": "Industrial",
  "externalSchemeAdmin": "Ardra Willan",
  "retirementSchemeName": "Morgan Stanley Emerging Markets Domestic Debt Fund, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "Laos"
}, {
  "bookingId": "673",
  "bookingType": "Toys",
  "externalSchemeAdmin": "Lonny Cureton",
  "retirementSchemeName": "NF Energy Saving Corporation",
  "schemePosition": "Metal Fabrications",
  "trainingVenue": "Philippines"
}, {
  "bookingId": "4958",
  "bookingType": "Electronics",
  "externalSchemeAdmin": "Aurelie Sunderland",
  "retirementSchemeName": "NewStar Financial, Inc.",
  "schemePosition": "Finance: Consumer Services",
  "trainingVenue": "Mongolia"
}, {
  "bookingId": "8424",
  "bookingType": "Home",
  "externalSchemeAdmin": "Jemimah Fyfe",
  "retirementSchemeName": "Taiwan Fund, Inc. (The)",
  "schemePosition": "n/a",
  "trainingVenue": "United States"
}, {
  "bookingId": "8",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Clarissa Lemanu",
  "retirementSchemeName": "Zions Bancorporation",
  "schemePosition": "Major Banks",
  "trainingVenue": "Iran"
}, {
  "bookingId": "5",
  "bookingType": "Shoes",
  "externalSchemeAdmin": "Gayelord Tire",
  "retirementSchemeName": "PowerShares FTSE International Low Beta Equal Weight Portfolio",
  "schemePosition": "n/a",
  "trainingVenue": "Argentina"
}, {
  "bookingId": "1837",
  "bookingType": "Games",
  "externalSchemeAdmin": "Paten Cliburn",
  "retirementSchemeName": "Cullen/Frost Bankers, Inc.",
  "schemePosition": "Major Banks",
  "trainingVenue": "New Zealand"
}, {
  "bookingId": "54387",
  "bookingType": "Kids",
  "externalSchemeAdmin": "Llywellyn Breydin",
  "retirementSchemeName": "Celgene Corporation",
  "schemePosition": "Major Pharmaceuticals",
  "trainingVenue": "Saudi Arabia"
}, {
  "bookingId": "7",
  "bookingType": "Tools",
  "externalSchemeAdmin": "Colman Cutts",
  "retirementSchemeName": "Validea Market Legends ETF",
  "schemePosition": "n/a",
  "trainingVenue": "Sweden"
}, {
  "bookingId": "08",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Kerri Snelgar",
  "retirementSchemeName": "Six Flags Entertainment Corporation New",
  "schemePosition": "Services-Misc. Amusement & Recreation",
  "trainingVenue": "China"
}, {
  "bookingId": "89531",
  "bookingType": "Computers",
  "externalSchemeAdmin": "Traver Arghent",
  "retirementSchemeName": "Tenneco Inc.",
  "schemePosition": "Auto Parts:O.E.M.",
  "trainingVenue": "Japan"
}, {
  "bookingId": "71666",
  "bookingType": "Shoes",
  "externalSchemeAdmin": "Pam Peachey",
  "retirementSchemeName": "Discover Financial Services",
  "schemePosition": "n/a",
  "trainingVenue": "Japan"
}, {
  "bookingId": "31925",
  "bookingType": "Toys",
  "externalSchemeAdmin": "Pavlov Wakerley",
  "retirementSchemeName": "Westell Technologies, Inc.",
  "schemePosition": "Telecommunications Equipment",
  "trainingVenue": "Brazil"
}, {
  "bookingId": "8",
  "bookingType": "Clothing",
  "externalSchemeAdmin": "Dunstan Benasik",
  "retirementSchemeName": "McDermott International, Inc.",
  "schemePosition": "Metal Fabrications",
  "trainingVenue": "Mexico"
}, {
  "bookingId": "2",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Aluin Churchin",
  "retirementSchemeName": "Franklin Financial Network, Inc.",
  "schemePosition": "Major Banks",
  "trainingVenue": "Japan"
}, {
  "bookingId": "18664",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Carolee Kleinert",
  "retirementSchemeName": "Applied DNA Sciences Inc",
  "schemePosition": "Other Consumer Services",
  "trainingVenue": "Brazil"
}, {
  "bookingId": "87",
  "bookingType": "Baby",
  "externalSchemeAdmin": "Josy Leith",
  "retirementSchemeName": "Tsakos Energy Navigation Ltd",
  "schemePosition": "Marine Transportation",
  "trainingVenue": "Estonia"
}, {
  "bookingId": "842",
  "bookingType": "Home",
  "externalSchemeAdmin": "Graham Dunbar",
  "retirementSchemeName": "Tenneco Inc.",
  "schemePosition": "Auto Parts:O.E.M.",
  "trainingVenue": "France"
}, {
  "bookingId": "0594",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Ainslee Blunt",
  "retirementSchemeName": "Target Corporation",
  "schemePosition": "Department/Specialty Retail Stores",
  "trainingVenue": "Russia"
}, {
  "bookingId": "757",
  "bookingType": "Electronics",
  "externalSchemeAdmin": "Shirley Woodger",
  "retirementSchemeName": "Leucadia National Corporation",
  "schemePosition": "Meat/Poultry/Fish",
  "trainingVenue": "Poland"
}, {
  "bookingId": "5404",
  "bookingType": "Jewelry",
  "externalSchemeAdmin": "Gardy Squier",
  "retirementSchemeName": "Syros Pharmaceuticals, Inc.",
  "schemePosition": "Major Pharmaceuticals",
  "trainingVenue": "Philippines"
}, {
  "bookingId": "6",
  "bookingType": "Home",
  "externalSchemeAdmin": "Chere Ferriman",
  "retirementSchemeName": "The RMR Group Inc.",
  "schemePosition": "Professional Services",
  "trainingVenue": "China"
}, {
  "bookingId": "7393",
  "bookingType": "Books",
  "externalSchemeAdmin": "Reinhard Shorey",
  "retirementSchemeName": "Navios Maritime Holdings Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "China"
}, {
  "bookingId": "91365",
  "bookingType": "Computers",
  "externalSchemeAdmin": "Viki Loder",
  "retirementSchemeName": "Quanex Building Products Corporation",
  "schemePosition": "Metal Fabrications",
  "trainingVenue": "Brazil"
}, {
  "bookingId": "812",
  "bookingType": "Games",
  "externalSchemeAdmin": "Beilul Oaker",
  "retirementSchemeName": "Schmitt Industries, Inc.",
  "schemePosition": "Industrial Machinery/Components",
  "trainingVenue": "Peru"
}, {
  "bookingId": "0161",
  "bookingType": "Toys",
  "externalSchemeAdmin": "Franciskus O'Connell",
  "retirementSchemeName": "First Trust Hong Kong AlphaDEX Fund",
  "schemePosition": "n/a",
  "trainingVenue": "Ukraine"
}, {
  "bookingId": "226",
  "bookingType": "Grocery",
  "externalSchemeAdmin": "Lauri Sullens",
  "retirementSchemeName": "Nuveen NASDAQ 100 Dynamic Overwrite Fund",
  "schemePosition": "n/a",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "0",
  "bookingType": "Kids",
  "externalSchemeAdmin": "Bernarr Maycey",
  "retirementSchemeName": "Eaton Vance Senior Floating-Rate Fund",
  "schemePosition": "n/a",
  "trainingVenue": "South Africa"
}, {
  "bookingId": "6",
  "bookingType": "Industrial",
  "externalSchemeAdmin": "Darcie McGrayle",
  "retirementSchemeName": "NextEra Energy, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "China"
}, {
  "bookingId": "0119",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Flint Sainsbury-Brown",
  "retirementSchemeName": "Aberdeen Japan Equity Fund, Inc. ",
  "schemePosition": "n/a",
  "trainingVenue": "Philippines"
}, {
  "bookingId": "20",
  "bookingType": "Games",
  "externalSchemeAdmin": "Ker Oldall",
  "retirementSchemeName": "Kosmos Energy Ltd.",
  "schemePosition": "Oil & Gas Production",
  "trainingVenue": "Russia"
}, {
  "bookingId": "737",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Scott Stanhope",
  "retirementSchemeName": "Luna Innovations Incorporated",
  "schemePosition": "Biotechnology: Commercial Physical & Biological Resarch",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "2125",
  "bookingType": "Tools",
  "externalSchemeAdmin": "Cedric Blease",
  "retirementSchemeName": "Taylor Devices, Inc.",
  "schemePosition": "Industrial Machinery/Components",
  "trainingVenue": "China"
}, {
  "bookingId": "69125",
  "bookingType": "Games",
  "externalSchemeAdmin": "Silvia Rameau",
  "retirementSchemeName": "BeiGene, Ltd.",
  "schemePosition": "Major Pharmaceuticals",
  "trainingVenue": "Belize"
}, {
  "bookingId": "53316",
  "bookingType": "Computers",
  "externalSchemeAdmin": "Konstantine Bubeer",
  "retirementSchemeName": "Alexandria Real Estate Equities, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "Philippines"
}, {
  "bookingId": "711",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Hastie Logsdale",
  "retirementSchemeName": "Ferro Corporation",
  "schemePosition": "Paints/Coatings",
  "trainingVenue": "Ethiopia"
}, {
  "bookingId": "1922",
  "bookingType": "Kids",
  "externalSchemeAdmin": "Channa Pringley",
  "retirementSchemeName": "Dextera Surgical Inc.",
  "schemePosition": "Medical/Dental Instruments",
  "trainingVenue": "Russia"
}, {
  "bookingId": "73349",
  "bookingType": "Shoes",
  "externalSchemeAdmin": "Trent Hannah",
  "retirementSchemeName": "Finjan Holdings, Inc.",
  "schemePosition": "Multi-Sector Companies",
  "trainingVenue": "Sweden"
}, {
  "bookingId": "86",
  "bookingType": "Health",
  "externalSchemeAdmin": "Abrahan Quayle",
  "retirementSchemeName": "JM Global Holding Company",
  "schemePosition": "Business Services",
  "trainingVenue": "Palestinian Territory"
}, {
  "bookingId": "931",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Prinz Sheaf",
  "retirementSchemeName": "KeyCorp",
  "schemePosition": "n/a",
  "trainingVenue": "China"
}, {
  "bookingId": "8",
  "bookingType": "Home",
  "externalSchemeAdmin": "Ransell Crick",
  "retirementSchemeName": "Mitek Systems, Inc.",
  "schemePosition": "Computer peripheral equipment",
  "trainingVenue": "Morocco"
}, {
  "bookingId": "49",
  "bookingType": "Shoes",
  "externalSchemeAdmin": "Raymund Ethridge",
  "retirementSchemeName": "Colony NorthStar, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "Poland"
}, {
  "bookingId": "3767",
  "bookingType": "Books",
  "externalSchemeAdmin": "Tine Pledge",
  "retirementSchemeName": "Autobytel Inc.",
  "schemePosition": "Computer Software: Programming, Data Processing",
  "trainingVenue": "China"
}, {
  "bookingId": "04714",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Cliff Ziehm",
  "retirementSchemeName": "Mississippi Power Company",
  "schemePosition": "n/a",
  "trainingVenue": "Argentina"
}, {
  "bookingId": "4243",
  "bookingType": "Electronics",
  "externalSchemeAdmin": "Orland Simeon",
  "retirementSchemeName": "DWS High Income Opportunities Fund, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "Paraguay"
}, {
  "bookingId": "0072",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Markus Dyte",
  "retirementSchemeName": "Monsanto Company",
  "schemePosition": "Agricultural Chemicals",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "599",
  "bookingType": "Computers",
  "externalSchemeAdmin": "Anissa Snasel",
  "retirementSchemeName": "Cullen/Frost Bankers, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "El Salvador"
}, {
  "bookingId": "6",
  "bookingType": "Books",
  "externalSchemeAdmin": "Beitris Medway",
  "retirementSchemeName": "Brookfield Business Partners L.P.",
  "schemePosition": "Engineering & Construction",
  "trainingVenue": "China"
}, {
  "bookingId": "702",
  "bookingType": "Kids",
  "externalSchemeAdmin": "Oliviero Linner",
  "retirementSchemeName": "Nuveen Build America Bond Opportunity Fund",
  "schemePosition": "n/a",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "5",
  "bookingType": "Games",
  "externalSchemeAdmin": "Carlin Elphee",
  "retirementSchemeName": "Carrols Restaurant Group, Inc.",
  "schemePosition": "Restaurants",
  "trainingVenue": "Sweden"
}, {
  "bookingId": "55",
  "bookingType": "Clothing",
  "externalSchemeAdmin": "Ernesto Broyd",
  "retirementSchemeName": "Image Sensing Systems, Inc.",
  "schemePosition": "Industrial Machinery/Components",
  "trainingVenue": "Poland"
}, {
  "bookingId": "950",
  "bookingType": "Books",
  "externalSchemeAdmin": "Nels Beecham",
  "retirementSchemeName": "LightInTheBox Holding Co., Ltd.",
  "schemePosition": "Catalog/Specialty Distribution",
  "trainingVenue": "Belarus"
}, {
  "bookingId": "1949",
  "bookingType": "Books",
  "externalSchemeAdmin": "Nero Petronis",
  "retirementSchemeName": "Iridium Communications Inc",
  "schemePosition": "Telecommunications Equipment",
  "trainingVenue": "Russia"
}, {
  "bookingId": "5058",
  "bookingType": "Outdoors",
  "externalSchemeAdmin": "Zack Adamides",
  "retirementSchemeName": "Beasley Broadcast Group, Inc.",
  "schemePosition": "Broadcasting",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "66",
  "bookingType": "Industrial",
  "externalSchemeAdmin": "Benny Collacombe",
  "retirementSchemeName": "Griffon Corporation",
  "schemePosition": "Building Products",
  "trainingVenue": "Palestinian Territory"
}, {
  "bookingId": "23",
  "bookingType": "Jewelry",
  "externalSchemeAdmin": "Ara Le Conte",
  "retirementSchemeName": "Banco Santander, S.A.",
  "schemePosition": "n/a",
  "trainingVenue": "China"
}, {
  "bookingId": "1066",
  "bookingType": "Computers",
  "externalSchemeAdmin": "Amii Loseke",
  "retirementSchemeName": "Iteris, Inc.",
  "schemePosition": "Telecommunications Equipment",
  "trainingVenue": "Canada"
}, {
  "bookingId": "39361",
  "bookingType": "Clothing",
  "externalSchemeAdmin": "Dacey Rozec",
  "retirementSchemeName": "Digi International Inc.",
  "schemePosition": "Computer Communications Equipment",
  "trainingVenue": "France"
}, {
  "bookingId": "133",
  "bookingType": "Games",
  "externalSchemeAdmin": "Rori Snasdell",
  "retirementSchemeName": "E.I. du Pont de Nemours and Company",
  "schemePosition": "Major Chemicals",
  "trainingVenue": "Portugal"
}, {
  "bookingId": "5",
  "bookingType": "Jewelry",
  "externalSchemeAdmin": "Justis Popland",
  "retirementSchemeName": "Och-Ziff Capital Management Group LLC",
  "schemePosition": "Investment Managers",
  "trainingVenue": "Sweden"
}, {
  "bookingId": "40285",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Roderic Isaacson",
  "retirementSchemeName": "eHealth, Inc.",
  "schemePosition": "Specialty Insurers",
  "trainingVenue": "Ghana"
}, {
  "bookingId": "5434",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Raffarty Dyett",
  "retirementSchemeName": "Acadia Realty Trust",
  "schemePosition": "Real Estate Investment Trusts",
  "trainingVenue": "Russia"
}, {
  "bookingId": "3825",
  "bookingType": "Tools",
  "externalSchemeAdmin": "Helyn Bengochea",
  "retirementSchemeName": "Global X SuperDividend Alternatives ETF",
  "schemePosition": "n/a",
  "trainingVenue": "Russia"
}, {
  "bookingId": "57552",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Kathy Klausen",
  "retirementSchemeName": "BMC Stock Holdings, Inc.",
  "schemePosition": "RETAIL: Building Materials",
  "trainingVenue": "Russia"
}, {
  "bookingId": "71673",
  "bookingType": "Grocery",
  "externalSchemeAdmin": "Nickey Stanistreet",
  "retirementSchemeName": "Eagle Materials Inc",
  "schemePosition": "Building Materials",
  "trainingVenue": "Honduras"
}, {
  "bookingId": "391",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Kasey Izaac",
  "retirementSchemeName": "Chesapeake Energy Corporation",
  "schemePosition": "n/a",
  "trainingVenue": "Portugal"
}, {
  "bookingId": "59",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Ade Northrop",
  "retirementSchemeName": "PowerShares Global Gold & Precious Metals Portfolio",
  "schemePosition": "n/a",
  "trainingVenue": "Portugal"
}, {
  "bookingId": "79315",
  "bookingType": "Industrial",
  "externalSchemeAdmin": "Sterling Gutteridge",
  "retirementSchemeName": "Bank of America Corporation",
  "schemePosition": "Major Banks",
  "trainingVenue": "Russia"
}, {
  "bookingId": "43",
  "bookingType": "Outdoors",
  "externalSchemeAdmin": "Letta MacBean",
  "retirementSchemeName": "Holly Energy Partners, L.P.",
  "schemePosition": "Natural Gas Distribution",
  "trainingVenue": "North Korea"
}, {
  "bookingId": "65",
  "bookingType": "Music",
  "externalSchemeAdmin": "Andriana Burch",
  "retirementSchemeName": "Goldman Sachs Group, Inc. (The)",
  "schemePosition": "n/a",
  "trainingVenue": "Russia"
}, {
  "bookingId": "65",
  "bookingType": "Electronics",
  "externalSchemeAdmin": "Brandyn Engledow",
  "retirementSchemeName": "Diamond Offshore Drilling, Inc.",
  "schemePosition": "Oil & Gas Production",
  "trainingVenue": "Yemen"
}, {
  "bookingId": "254",
  "bookingType": "Toys",
  "externalSchemeAdmin": "Krissie Gedge",
  "retirementSchemeName": "LightPath Technologies, Inc.",
  "schemePosition": "Semiconductors",
  "trainingVenue": "Canada"
}, {
  "bookingId": "531",
  "bookingType": "Grocery",
  "externalSchemeAdmin": "Waverley Triggol",
  "retirementSchemeName": "Callaway Golf Company",
  "schemePosition": "Recreational Products/Toys",
  "trainingVenue": "Ukraine"
}, {
  "bookingId": "41650",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Moritz Besque",
  "retirementSchemeName": "W.R. Berkley Corporation",
  "schemePosition": "n/a",
  "trainingVenue": "China"
}, {
  "bookingId": "38",
  "bookingType": "Tools",
  "externalSchemeAdmin": "Lamond Skewes",
  "retirementSchemeName": "GTT Communications, Inc.",
  "schemePosition": "Telecommunications Equipment",
  "trainingVenue": "Nigeria"
}, {
  "bookingId": "8556",
  "bookingType": "Beauty",
  "externalSchemeAdmin": "Ingra Whipp",
  "retirementSchemeName": "Axalta Coating Systems Ltd.",
  "schemePosition": "Paints/Coatings",
  "trainingVenue": "Guatemala"
}, {
  "bookingId": "12985",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Alessandro Winfield",
  "retirementSchemeName": "vTv Therapeutics Inc.",
  "schemePosition": "Major Pharmaceuticals",
  "trainingVenue": "United States"
}, {
  "bookingId": "1154",
  "bookingType": "Outdoors",
  "externalSchemeAdmin": "Holly Parcall",
  "retirementSchemeName": "John Hancock Tax-Advantaged Global Shareholder Yield Fund",
  "schemePosition": "n/a",
  "trainingVenue": "China"
}, {
  "bookingId": "59913",
  "bookingType": "Health",
  "externalSchemeAdmin": "Aldus Holttom",
  "retirementSchemeName": "NextEra Energy, Inc.",
  "schemePosition": "n/a",
  "trainingVenue": "Burkina Faso"
}, {
  "bookingId": "46",
  "bookingType": "Garden",
  "externalSchemeAdmin": "Darnall Pawlaczyk",
  "retirementSchemeName": "MFA Financial, Inc.",
  "schemePosition": "Real Estate Investment Trusts",
  "trainingVenue": "Indonesia"
}, {
  "bookingId": "7",
  "bookingType": "Automotive",
  "externalSchemeAdmin": "Ruby Avramovic",
  "retirementSchemeName": "Monster Beverage Corporation",
  "schemePosition": "Beverages (Production/Distribution)",
  "trainingVenue": "Russia"
}]