
// just adding typese & interfaces
//  might show error when in tsconfig.json "skipLibCheck": true, is not set
// '( 
// do you know this ?    ><


export type Stock = {
      id : number
      name: string
      price: number
}

export type Stocks = Stock[]

export interface AccordionProps {
      stock : Stock 
}