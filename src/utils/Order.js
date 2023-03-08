class dataitem {
    constructor(count, itemName, quantity, oum, unitCost, extendedCost, taxCode, taxRate, taxAmount, discountType, supplierCost, discountRate, discountAmount, lineTotal){
      this.itemName = itemName;
      this.number = count;
      this.quantity = quantity;
      this.OUM = oum;
      this.unitCost = unitCost;
      this.extendedCost = extendedCost;
      this.taxCode = taxCode;
      this.taxRate = taxRate;
      this.taxAmount = taxAmount;
      this.discountType = discountType;
      this.supplierCost = supplierCost;
      this.discountRate = discountRate;
      this.discountAmount = discountAmount;
      this.lineTotal = lineTotal;

      return this;
    }

    data() {
      return {
        itemNumber: this.number,
        item: this.itemName,
        quantity: this.quantity,
        OUM: this.OUM,
        unitCost: this.unitCost,
        extendedCost: this.extendedCost,
        taxCode: this.taxCode,
        taxRate: this.taxRate,
        taxAmount: this.taxAmount,
        discountType: this.discountType,
        supplierCost: this.supplierCost,
        discountRate: this.discountRate,
        discountAmount: this.discountAmount,
        lineTotal: this.lineTotal
      }
    }
  }


export default dataitem;