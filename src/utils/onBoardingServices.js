export const handleCategory = (category) => {
  switch (category) {
    case "Automotive, Mobility & Transportation":
      return 1;

    case "Energy & Sustainability":
      return 2;

    case "Finance Services":
      return 3;

    case "Healthcare & Life Sciences":
      return 4;

    case "Manufacturing & Supply Chain":
      return 5;

    case "Media & Communications":
      return 6;

    case "Public Sector":
      return 7;

    case "Retail & Consumer Goods":
      return 8;

    case "Software":
      return 9;

    default:
      return 9;
  }
};

export const handleServicePlan = (servicePlan) => {
  switch (servicePlan) {
    case "Free (Free Forever)":
      return 5;

    case "Basic (Ksh3,000, Free 7 Days Trial)":
      return 6;

    case "Standard (Ksh10,000, Free 14 Days Trial)":
      return 7;

    default:
      return 7;
  }
};
