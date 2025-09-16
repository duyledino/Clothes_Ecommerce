type BestSeller = {
    id: string;
    price: number;
    count: number;
    title: string;
}


export const standardBestSeller = (productArray: BestSeller[])=>{
    //Assumne get product type above from server
    return productArray;
}