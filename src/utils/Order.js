class dataitem {
    constructor(item, quantity, unitCost, extendedCost, taxAmount, discountAmount, lineTotal, partitionKey, id){
      this.item = item;
      this.quantity = quantity;
      this.unitCost = unitCost;
      this.extendedCost = extendedCost;
      this.taxAmount = taxAmount;
      this.discountAmount = discountAmount;
      this.lineTotal = lineTotal;
      this.partitionKey = partitionKey;
      this.id = id;


      return this;
    }

    data() {
      return {
        item: this.item,
        quantity: this.quantity,
        unitCost: this.unitCost,
        extendedCost: this.extendedCost,
        taxAmount: this.taxAmount,
        discountAmount: this.discountAmount,
        lineTotal: this.lineTotal,
        partitionKey: this.partitionKey,
        id: this.id
      }
    }
  }


export default dataitem;